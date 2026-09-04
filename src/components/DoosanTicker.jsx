import { useEffect, useState } from 'react'
import { fetchAPI } from '../api'

const stadiumCoordinates = {
  '인천SSG랜더스필드': [37.4371, 126.6932],
  '잠실야구장': [37.5121, 127.0719],
  '사직야구장': [35.1940, 129.0614],
  '광주-기아 챔피언스 필드': [35.1681, 126.8895],
  '고척스카이돔': [37.4982, 126.8671],
  '대구삼성라이온즈파크': [35.8410, 128.6814],
  '수원KT위즈파크': [37.2997, 127.0097],
  '창원NC파크': [35.2229, 128.5820]
}

function previousDate(dateString) {
  const date = new Date(`${dateString}T00:00:00+09:00`)
  date.setDate(date.getDate() - 1)
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

function formatChange(value, suffix) {
  if (value === null || value === undefined) return null
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}${suffix}`
}

async function fetchWeather(game) {
  const coordinates = stadiumCoordinates[game.stadium]
  if (!coordinates) return null
  const yesterday = previousDate(game.date)
  const hour = String(game.startTime || '18:00').slice(0, 2)
  const params = new URLSearchParams({
    latitude: coordinates[0], longitude: coordinates[1],
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min',
    wind_speed_unit: 'ms', timezone: 'Asia/Seoul', start_date: yesterday, end_date: game.date
  })
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) return null
  const data = await response.json()
  const currentIndex = data.hourly.time.indexOf(`${game.date}T${hour}:00`)
  const yesterdayIndex = data.hourly.time.indexOf(`${yesterday}T${hour}:00`)
  const dailyIndex = data.daily.time.indexOf(game.date)
  const yesterdayDailyIndex = data.daily.time.indexOf(yesterday)
  if (currentIndex < 0 || dailyIndex < 0) return null
  const weatherCode = data.hourly.weather_code[currentIndex]
  const sky = weatherCode === 0 ? '맑음' : [1, 2, 3].includes(weatherCode) ? '구름 많음' : [61, 63, 65, 80, 81, 82].includes(weatherCode) ? '비' : '흐림'
  const temperature = data.hourly.temperature_2m[currentIndex]
  const wind = data.hourly.wind_speed_10m[currentIndex]
  return {
    temperature: Math.round(temperature),
    temperatureChange: yesterdayIndex >= 0 ? formatChange(temperature - data.hourly.temperature_2m[yesterdayIndex], '°') : null,
    maximum: Math.round(data.daily.temperature_2m_max[dailyIndex]),
    minimum: Math.round(data.daily.temperature_2m_min[dailyIndex]),
    maximumChange: yesterdayDailyIndex >= 0 ? formatChange(data.daily.temperature_2m_max[dailyIndex] - data.daily.temperature_2m_max[yesterdayDailyIndex], '°') : null,
    humidity: Math.round(data.hourly.relative_humidity_2m[currentIndex]),
    precipitationProbability: Math.round(data.hourly.precipitation_probability[currentIndex]),
    sky,
    wind: wind.toFixed(1),
    windChange: yesterdayIndex >= 0 ? formatChange(wind - data.hourly.wind_speed_10m[yesterdayIndex], 'm/s') : null
  }
}

function gameText(game) {
  const score = game.status === 'SCHEDULED' ? '' : ` ${game.score.away}-${game.score.home}`
  const inning = game.status === 'IN_PROGRESS' && game.currentInning ? ` · ${game.currentInning}회` : ''
  const weather = game.weather
  const weatherText = weather
    ? ` · 경기 시각 ${weather.temperature}° ${weather.temperatureChange ? `(${weather.temperatureChange})` : ''} · 최고/최저 ${weather.maximum}°/${weather.minimum}° ${weather.maximumChange ? `(${weather.maximumChange})` : ''} · ${weather.sky} · 강수 ${weather.precipitationProbability}% · 습도 ${weather.humidity}% · 바람 ${weather.wind}m/s ${weather.windChange ? `(${weather.windChange})` : ''}`
    : ''
  return `오늘의 두산경기 · ${game.startTime} · ${game.awayTeam} vs ${game.homeTeam}${score} · ${game.stadium} · ${game.statusLabel}${inning}${weatherText}`
}

export default function DoosanTicker() {
  const [game, setGame] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    const loadGame = async () => {
      try {
        const data = await fetchAPI('/sports/doosan')
        if (active) {
          let nextGame = data.games?.[0] || null
          if (nextGame && !nextGame.weather) {
            try {
              nextGame = { ...nextGame, weather: await fetchWeather(nextGame) }
            } catch {
              // Keep the game ticker usable when the weather service is unavailable.
            }
          }
          setGame(nextGame)
          setError(false)
        }
      } catch {
        if (active) setError(true)
      }
    }
    loadGame()
    const timer = window.setInterval(loadGame, 60_000)
    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [])

  const message = error
    ? '오늘의 두산경기 · 경기 정보를 불러오는 중입니다'
    : game
      ? gameText(game)
      : '오늘의 두산경기 · 예정된 경기가 없습니다'

  return (
    <div className="doosan-ticker" aria-live="polite">
      <a className="ticker-track" href={game?.detailUrl} target="_blank" rel="noreferrer">
        <span>{message}</span>
      </a>
    </div>
  )
}
