import { MarkdownAsync } from 'react-markdown'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

/**
 * Renders Markdown on the server. Syntax highlighting runs during rendering,
 * so neither the parser nor the highlighter is sent to the browser.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose max-w-none prose-gray dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-gray-200 prose-pre:bg-gray-50 dark:prose-pre:border-dark-border-default dark:prose-pre:bg-dark-elevated">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypePrettyCode,
            {
              theme: { light: 'github-light', dark: 'github-dark' },
              keepBackground: false,
              defaultLang: 'plaintext',
            },
          ],
        ]}
      >
        {children}
      </MarkdownAsync>
    </div>
  )
}
