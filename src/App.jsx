import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [activeTab, setActiveTab] = useState(null)
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
      {showIntro && (
        <div className="intro-screen">
          <div className="intro-art" aria-hidden="true">
            <span className="intro-ring intro-ring-one" />
            <span className="intro-ring intro-ring-two" />
            <span className="intro-glow" />
          </div>
          <div className="intro-copy">
            <span className="intro-kicker">BEN LEE'S WORKPLACE</span>
            <div className="intro-title">Welcome 신과장님</div>
            <span className="intro-line" />
          </div>
        </div>
      )}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 flex flex-col">
        <Header onHome={() => handleTabChange(null)} />
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
