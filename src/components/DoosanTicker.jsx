import { useEffect, useState } from 'react'
import { fetchAPI } from '../api'

function gameText(game) {
  const score = game.status === 'SCHEDULED' ? '' : ` ${game.score.away}-${game.score.home}`
  const inning = game.status === 'IN_PROGRESS' && game.currentInning ? ` · ${game.currentInning}회` : ''
  return `오늘의 두산경기 · ${game.startTime} · ${game.awayTeam} vs ${game.homeTeam}${score} · ${game.stadium} · ${game.statusLabel}${inning}`
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
          setGame(data.games?.[0] || null)
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
