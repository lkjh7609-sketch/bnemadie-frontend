import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [activeTab, setActiveTab] = useState('generate')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setResult(null)
  }

  return (
    <div className="app-shell flex h-screen">
      {showIntro && <div className="intro-screen"><div className="intro-title">Welcome 신과장</div></div>}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent 
          activeTab={activeTab}
          result={result}
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  )
}

export default App
