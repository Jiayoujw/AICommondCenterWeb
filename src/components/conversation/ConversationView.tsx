import { useConversationStore } from '../../stores/conversationStore'
import { useProviderStore } from '../../stores/providerStore'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { MessageList } from './MessageList'
import { EmptyState } from './EmptyState'
import { InputArea } from '../input/InputArea'
import { cn } from '../../utils/cn'

export function ConversationView() {
  const activeConversationId = useConversationStore((s) => s.activeConversationId)
  const conversations = useConversationStore((s) => s.conversations)
  const createConversation = useConversationStore((s) => s.createConversation)
  const activeProvider = useProviderStore((s) => s.activeProvider)

  let activeConv = conversations.find((c) => c.id === activeConversationId)

  if (!activeConv) {
    return (
      <div className={cn(
        'flex-1 flex flex-col',
        conversations.length === 0 && 'items-center justify-center'
      )}>
        <EmptyState
          onCreateSession={() => createConversation(activeProvider)}
          hasSessions={conversations.length > 0}
        />
        {conversations.length > 0 && (
          <div className="p-4 flex-1 flex items-center justify-center">
            <p className="text-terminal-muted text-sm font-mono">
              Select a session or create a new one
            </p>
          </div>
        )}
      </div>
    )
  }

  const messages = activeConv.messages
  const containerRef = useAutoScroll(messages.length)

  return (
    <>
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <MessageList messages={messages} />
      </div>
      <InputArea conversationId={activeConv.id} />
    </>
  )
}
