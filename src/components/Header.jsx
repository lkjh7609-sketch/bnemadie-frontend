import DoosanTicker from './DoosanTicker'

export default function Header({ onHome }) {
  return (
    <header className="workspace-toolbar sticky top-0 z-10">
      <div className="flex items-center justify-end max-w-7xl mx-auto">
        <button type="button" onClick={onHome} className="home-button header-home-button" aria-label="홈으로 이동">
          홈
        </button>
      </div>
      <DoosanTicker />
    </header>
  )
}
