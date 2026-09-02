import GenerateEmail from './features/GenerateEmail'
import SmartGenerate from './features/SmartGenerate'
import ReplyEmail from './features/ReplyEmail'
import GrammarCheck from './features/GrammarCheck'
import SummarizeEmail from './features/SummarizeEmail'
import AnalyzeEmail from './features/AnalyzeEmail'
import ExtractActions from './features/ExtractActions'
import RegenerateEmail from './features/RegenerateEmail'
import ResultDisplay from './ResultDisplay'

export default function MainContent({ activeTab, result, setResult, loading, setLoading }) {
  const renderFeature = () => {
    const props = { setResult, loading, setLoading }
    
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
    <main className="flex-1 overflow-y-auto bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 왼쪽 입력 영역 */}
          <div key={`input-${activeTab}`} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-7 animate-fade-in-up transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {renderFeature()}
          </div>
          
          {/* 오른쪽 결과 영역 */}
          <div key={`result-${activeTab}`} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-7 animate-fade-in-up transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]" style={{ animationDelay: '100ms' }}>
            <ResultDisplay result={result} loading={loading} activeTab={activeTab} />
          </div>

        </div>
      </div>
    </main>
  )
}