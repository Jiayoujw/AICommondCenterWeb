import type { Message } from '../../types/conversation'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id} message={msg} isLast={i === messages.length - 1} />
      ))}
    </>
  )
}
