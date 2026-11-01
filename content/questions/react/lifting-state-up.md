---
title: What does lifting state up mean and when do you need it?
category: react
level: junior
tags: [state]
sources:
  - title: Sharing State Between Components – React docs
    url: https://react.dev/learn/sharing-state-between-components
---

Lifting state up means **moving state from two sibling components into their closest common parent**, then passing it down as props together with callbacks to change it. You need it when **two components must stay in sync** or one must react to the other.

Example: an accordion where only one panel can be open. If each `Panel` has its own `isOpen` state, they cannot coordinate. Move `activeIndex` into `Accordion`:

```tsx
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <Panel isActive={activeIndex === 0} onShow={() => setActiveIndex(0)} />
      <Panel isActive={activeIndex === 1} onShow={() => setActiveIndex(1)} />
    </>
  )
}
```

The panels become **controlled** by the parent. Lift state only as high as necessary; if it ends up very high and passes through many layers, consider **context**.
