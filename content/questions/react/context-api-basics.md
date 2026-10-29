---
title: How does the Context API work and when should you use it?
category: react
level: mid
tags: [context, hooks]
sources:
  - title: Passing Data Deeply with Context – React docs
    url: https://react.dev/learn/passing-data-deeply-with-context
---

Context lets a component **provide a value to its whole subtree** so that any descendant can read it **without passing props through every level** (prop drilling).

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light')

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  )
}

function Button() {
  const theme = useContext(ThemeContext)   // nearest provider above
}
```

Key points:

- A component reads the value from the **nearest provider above it**; without one it gets the **default** passed to `createContext`.
- In React 19 you render `<ThemeContext value>` directly; `<ThemeContext.Provider>` still works but is the older form.
- When the provided value changes, **every component reading that context re-renders**.

Good uses: **theme, current user, locale, feature flags**, or state shared by a compound widget.

Don't reach for it first. Passing props a few levels is fine and explicit, and **composition with `children`** often removes drilling. Context is not a full state manager; for frequently changing global data, a dedicated store may fit better.
