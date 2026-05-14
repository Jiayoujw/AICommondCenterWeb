import type { Message } from '../../types/conversation'
import { UserMessage } from './UserMessage'
import { AIMessage } from './AIMessage'

interface MessageBubbleProps {
  message: Message
  isLast: boolean
}

export function MessageBubble({ message, isLast }: MessageBubbleProps) {
  if (message.role === 'user') {
    return <UserMessage message={message} />
  }
  return <AIMessage message={message} isLast={isLast} />
}
