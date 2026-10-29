import { describe, expect, it } from 'vitest'
import { parseQuestion } from './content'

const frontmatter = `---
title: What does this log?
category: javascript
level: mid
tags: [event-loop]
sources: []
---
`

describe('parseQuestion', () => {
  it('treats the whole body as the answer when there is no marker', () => {
    const question = parseQuestion('event-loop', `${frontmatter}\nIt logs 1.\n`)

    expect(question.description).toBeNull()
    expect(question.answer).toBe('It logs 1.')
  })

  it('splits the description from the answer at the marker', () => {
    const raw = `${frontmatter}\n\`\`\`js\nconsole.log(1)\n\`\`\`\n\n<!-- answer -->\n\nIt logs 1.\n`
    const question = parseQuestion('event-loop', raw)

    expect(question.description).toBe('```js\nconsole.log(1)\n```')
    expect(question.answer).toBe('It logs 1.')
  })

  it('rejects more than one marker', () => {
    const raw = `${frontmatter}\nA\n<!-- answer -->\nB\n<!-- answer -->\nC`

    expect(() => parseQuestion('event-loop', raw)).toThrow('at most once')
  })

  it('rejects unknown frontmatter fields and invalid levels', () => {
    const raw = frontmatter.replace('level: mid', 'level: expert\nextra: 1')

    expect(() => parseQuestion('event-loop', `${raw}\nAnswer`)).toThrow()
  })
})
