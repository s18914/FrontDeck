---
title: How many times does a memoized context consumer render when the provider re-renders with an object value?
category: react
level: mid
tags: [context, memoization, output-prediction]
sources: []
---

The app renders `<ThemeProvider><Label /></ThemeProvider>`. The user clicks the button three times. No React Compiler, no StrictMode.

```tsx
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')
  const [clicks, setClicks] = useState(0)
  const value = { theme, setTheme }
  return (
    <ThemeContext value={value}>
      <button onClick={() => setClicks(c => c + 1)}>Clicks: {clicks}</button>
      {children}
    </ThemeContext>
  )
}

const Label = memo(function Label() {
  const { theme } = useContext(ThemeContext)
  console.log('Label render')
  return <span>{theme}</span>
})
```

<!-- answer -->

`Label render` is logged **4 times**: once on mount and once per click, even though `theme` never changes.

Each click re-renders `ThemeProvider`. The `<Label />` element arrives through `children`, so it is the same element and the **parent re-render alone would not re-render it**. On top of that, `Label` is wrapped in `memo`. But `value = { theme, setTheme }` is a **new object on every render**, and React re-renders **every consumer** whenever the provider's value changes by `Object.is`. `memo` does not block context updates.

The fix is to keep the value stable:

```tsx
const value = useMemo(() => ({ theme, setTheme }), [theme])
```

Now `Label` logs once and renders again only when `theme` changes. The React Compiler would apply this memoization automatically.
