---
title: How do you access a DOM element directly in React?
category: react
level: junior
tags: [hooks, dom]
sources:
  - title: Manipulating the DOM with Refs – React docs
    url: https://react.dev/learn/manipulating-the-dom-with-refs
---

Create a ref with **`useRef`** and pass it to the element's **`ref`** attribute. After React commits the element to the DOM, `ref.current` points to the DOM node.

```tsx
function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Search</button>
    </>
  )
}
```

Key points:

- `ref.current` is **`null` during the first render**; read it in event handlers or effects, not in the render body.
- Typical uses: **focus**, scroll into view, measuring size, media playback, integrating non-React libraries.
- Prefer declarative props for everything else. Don't use refs to change content React manages (for example removing nodes), or the DOM and React will disagree.
- `document.querySelector` in components is an anti-pattern: refs are scoped to the component instance.
