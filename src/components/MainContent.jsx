import GenerateEmail from './features/GenerateEmail'
import SmartGenerate from './features/SmartGenerate'
import ReplyEmail from './features/ReplyEmail'
import GrammarCheck from './features/GrammarCheck'
import SummarizeEmail from './features/SummarizeEmail'
import AnalyzeEmail from './features/AnalyzeEmail'
import ExtractActions from './features/ExtractActions'
import RegenerateEmail from './features/RegenerateEmail'
import ResultDisplay from './ResultDisplay'
import LanguageSelector from './LanguageSelector'
import { useEffect, useState } from 'react'

export default function MainContent({ activeTab, result, setResult, loading, setLoading }) {
  const [outputLanguage, setOutputLanguage] = useState('korean')
  const [customLanguage, setCustomLanguage] = useState('')

  useEffect(() => {
    setResult(null)
    setLoading(false)
  }, [activeTab, setResult, setLoading])

  const selectedOutputLanguage = outputLanguage === 'other' ? customLanguage.trim() : outputLanguage

  const renderFeature = () => {
    const props = { setResult, loading, setLoading, outputLanguage: selectedOutputLanguage }
    
    switch (activeTab) {
      case 'generate': return <GenerateEmail {...props} />
      case 'smart-generate': return <SmartGenerate {...props} />
      case 'reply': return <ReplyEmail {...props} />
      case 'grammar': return <GrammarCheck {...props} />
      case 'summarize': return <SummarizeEmail {...props} />
      case 'analyze': return <AnalyzeEmail {...props} />
      case 'extract-actions': return <ExtractActions {...props} />
      case 'regenerate': return <RegenerateEmail {...props} />
      default: return <GenerateEmail {...props} />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 왼쪽 입력 영역 */}
          <div key={`input-${activeTab}`} className="glass-panel p-7 animate-fade-in-up">
            <LanguageSelector
              outputLanguage={outputLanguage}
              customLanguage={customLanguage}
              setOutputLanguage={setOutputLanguage}
              setCustomLanguage={setCustomLanguage}
            />
            {renderFeature()}
          </div>
          
          {/* 오른쪽 결과 영역 */}
          <div key={`result-${activeTab}`} className="glass-panel p-7 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <ResultDisplay result={result} loading={loading} activeTab={activeTab} />
          </div>

        </div>
      </div>
    </main>
  )
}
