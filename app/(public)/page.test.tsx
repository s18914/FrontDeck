import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Home from './page'

test('renders the hero heading and a link to the question library', () => {
  render(<Home />)

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /prepare for frontend interviews/i,
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Browse questions' }),
  ).toHaveAttribute('href', '/questions')
})
