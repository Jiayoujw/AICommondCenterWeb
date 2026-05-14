import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Markdown
      components={
        {
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const codeStr = String(children).replace(/\n$/, '')
            // eslint-disable-next-line react/prop-types
            const ref = ((props as Record<string, unknown>).ref as React.Ref<HTMLElement>) || undefined
            const otherProps: Record<string, unknown> = {}
            for (const [key, val] of Object.entries(props as Record<string, unknown>)) {
              if (key !== 'ref') otherProps[key] = val
            }

            if (match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  ref={ref as React.Ref<SyntaxHighlighter>}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0 0 6px 6px',
                    fontSize: '13px',
                    background: '#0d1117',
                  }}
                  {...otherProps}
                >
                  {codeStr}
                </SyntaxHighlighter>
              )
            }

            return (
              <code className={className} ref={ref} {...otherProps}>
                {children}
              </code>
            )
          },
        } as Components
      }
    >
      {content}
    </Markdown>
  )
}
