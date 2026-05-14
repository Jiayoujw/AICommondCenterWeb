import { Plus, MessageSquare, X } from 'lucide-react'
import { useUIStore } from '../../stores/uiStore'
import { useConversationStore } from '../../stores/conversationStore'
import { useProviderStore } from '../../stores/providerStore'
import { cn } from '../../utils/cn'

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const conversations = useConversationStore((s) => s.conversations)
  const activeConversationId = useConversationStore((s) => s.activeConversationId)
  const setActiveConversation = useConversationStore((s) => s.setActiveConversation)
  const createConversation = useConversationStore((s) => s.createConversation)
  const deleteConversation = useConversationStore((s) => s.deleteConversation)
  const activeProvider = useProviderStore((s) => s.activeProvider)

  const handleNew = () => {
    createConversation(activeProvider)
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={cn(
          'fixed lg:relative z-30 h-full w-64 bg-terminal-surface border-r border-terminal-border flex flex-col shrink-0 transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'
        )}
      >
        <div className="flex items-center justify-between p-3 border-b border-terminal-border">
          <span className="text-xs text-terminal-muted tracking-wider">SESSIONS</span>
          <div className="flex gap-1">
            <button
              onClick={handleNew}
              className="text-terminal-muted hover:text-[var(--color-neon-cyan)] transition-colors p-1"
              title="New Session"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={toggleSidebar}
              className="text-terminal-muted hover:text-terminal-text transition-colors p-1 lg:hidden"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 && (
            <p className="text-xs text-terminal-muted text-center py-8">
              No sessions yet. Start a new one.
            </p>
          )}
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setActiveConversation(conv.id)
                toggleSidebar()
              }}
              className={cn(
                'w-full text-left px-3 py-2 rounded text-xs flex items-center gap-2 transition-colors group',
                conv.id === activeConversationId
                  ? 'bg-terminal-surface2 text-[var(--color-neon-cyan)]'
                  : 'text-terminal-text hover:bg-terminal-surface2'
              )}
            >
              <MessageSquare size={14} className="shrink-0" />
              <span className="truncate flex-1">{conv.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteConversation(conv.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-terminal-muted hover:text-[var(--color-neon-red)] transition-all p-0.5"
              >
                <X size={12} />
              </button>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-terminal-border">
          <button
            onClick={handleNew}
            className="w-full py-2 text-xs border border-terminal-border rounded text-terminal-muted hover:text-terminal-text hover:border-[var(--color-neon-cyan)] transition-colors font-mono"
          >
            + NEW SESSION
          </button>
        </div>
      </aside>
    </>
  )
}
