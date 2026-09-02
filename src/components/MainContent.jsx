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
      case 'generate':
        return <GenerateEmail {...props} />
      case 'smart-generate':
        return <SmartGenerate {...props} />
      case 'reply':
        return <ReplyEmail {...props} />
      case 'grammar':
        return <GrammarCheck {...props} />
      case 'summarize':
        return <SummarizeEmail {...props} />
      case 'analyze':
        return <AnalyzeEmail {...props} />
      case 'extract-actions':
        return <ExtractActions {...props} />
      case 'regenerate':
        return <RegenerateEmail {...props} />
      default:
        return <GenerateEmail {...props} />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderFeature()}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ResultDisplay result={result} loading={loading} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </main>
  )
}