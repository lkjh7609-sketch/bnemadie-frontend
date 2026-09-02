import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  const [activeTab, setActiveTab] = useState('generate')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
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