import { ImageResponse } from 'next/og'

export const alt =
  'FrontDeck: prepare for frontend interviews with spaced repetition'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// ImageResponse renders a subset of CSS (flexbox only) with its built-in font,
// so this mirrors the home page hero rather than reusing its Tailwind classes.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#ffffff',
        color: '#171717',
      }}
    >
      <div style={{ fontSize: 40 }}>FrontDeck</div>
      <div
        style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}
      >
        <div style={{ fontSize: 76 }}>Prepare for frontend interviews</div>
        <div style={{ fontSize: 76, color: '#009cec' }}>
          with spaced repetition
        </div>
      </div>
      <div
        style={{
          height: 12,
          borderRadius: 6,
          backgroundImage: 'linear-gradient(90deg, #009cec, #00c3ec)',
        }}
      />
    </div>,
    size,
  )
}
