import { useUIStore } from '../../stores/uiStore'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Scanlines } from '../ui/Scanlines'
import { ConversationView } from '../conversation/ConversationView'
import { SettingsPanel } from '../settings/SettingsPanel'
import { cn } from '../../utils/cn'

export function AppShell() {
  const scanlinesEnabled = useUIStore((s) => s.scanlinesEnabled)
  const settingsOpen = useUIStore((s) => s.settingsOpen)

  return (
    <div className={cn(
      'h-full flex flex-col bg-terminal-bg text-terminal-text font-mono starfield-bg',
      scanlinesEnabled && 'scanlines'
    )}>
      <Scanlines enabled={false} />
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 relative">
          <ConversationView />
        </main>
        {settingsOpen && <SettingsPanel />}
      </div>
      <Footer />
    </div>
  )
}
