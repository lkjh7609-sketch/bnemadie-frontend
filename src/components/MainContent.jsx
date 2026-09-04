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
import RegulatoryReferenceSelector from './RegulatoryReferenceSelector'
import { useEffect, useState } from 'react'

export default function MainContent({ activeTab, result, setResult, loading, setLoading }) {
  const [outputLanguage, setOutputLanguage] = useState('korean')
  const [customLanguage, setCustomLanguage] = useState('')
  const [regulatoryReferenceId, setRegulatoryReferenceId] = useState('none')

  useEffect(() => {
    setResult(null)
    setLoading(false)
  }, [activeTab, setResult, setLoading])

  const selectedOutputLanguage = outputLanguage === 'other' ? (customLanguage.trim() || 'korean') : outputLanguage

  const languageSelector = (
    <LanguageSelector
      outputLanguage={outputLanguage}
      customLanguage={customLanguage}
      setOutputLanguage={setOutputLanguage}
      setCustomLanguage={setCustomLanguage}
    />
  )

  const renderFeature = () => {
    const props = { setResult, loading, setLoading, outputLanguage: selectedOutputLanguage, languageSelector, regulatoryReferenceId }
    
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

  if (!activeTab) {
    return (
      <main className="main-content flex-1 overflow-y-auto">
        <div className="home-page max-w-5xl mx-auto p-8">
          <section className="glass-panel home-card p-10">
            <p className="home-eyebrow">Ben Lee's Workplace</p>
            <h1 className="home-title">업무 이메일을 더 빠르고 명확하게</h1>
            <p className="home-description">
              이메일 작성부터 문법 교정, 답장 작성, 요약과 액션 아이템 추출까지 한 곳에서 처리할 수 있는 업무용 도구입니다.
              입력한 문장의 언어는 자동으로 인식하며, 원하는 출력 언어를 선택해 결과를 받을 수 있습니다.
            </p>
            <div className="home-guide-grid">
              <div><h2>작성</h2><p>이메일 작성과 Smart 작성을 통해 상황에 맞는 제목과 본문을 만듭니다.</p></div>
              <div><h2>검토</h2><p>문법, 표현, 구조와 비즈니스 맥락을 점검해 더 자연스러운 문장으로 다듬습니다.</p></div>
              <div><h2>정리</h2><p>긴 이메일을 요약하고 핵심 내용, 마감일, 액션 아이템을 정리합니다.</p></div>
              <div><h2>사용 방법</h2><p>왼쪽 메뉴에서 기능을 고른 뒤 내용을 입력하고 출력 언어를 선택해 실행하세요.</p></div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="main-content flex-1 overflow-y-auto">
      <div className="feature-page max-w-7xl mx-auto p-8">
        <RegulatoryReferenceSelector value={regulatoryReferenceId} onChange={setRegulatoryReferenceId} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 왼쪽 입력 영역 */}
          <div key={`input-${activeTab}`} className="glass-panel p-7">
            {renderFeature()}
          </div>
          
          {/* 오른쪽 결과 영역 */}
          <div key={`result-${activeTab}`} className="glass-panel p-7">
            <ResultDisplay result={result} loading={loading} activeTab={activeTab} />
          </div>

        </div>
      </div>
    </main>
  )
}
