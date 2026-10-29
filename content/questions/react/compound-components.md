---
title: What are compound components, and how do you implement them in modern React?
category: react
level: senior
tags: [component-patterns, context]
sources: []
---

Compound components are a group of components that **work together and share implicit state** through a common parent, like `<Tabs>`, `<Tabs.List>`, `<Tabs.Tab>` and `<Tabs.Panel>`, similar to native `<select>` and `<option>`. The consumer controls **structure and markup**, while the parent owns state and behavior.

The modern implementation uses **context**: the parent holds the state and provides it, and the children read it. The older approach of `React.Children.map` with `cloneElement` is brittle, because it breaks as soon as a consumer wraps a child in a `<div>` or a fragment.

```tsx
const TabsContext = createContext<TabsState | null>(null)

function useTabs() {
  const ctx = use(TabsContext)
  if (!ctx) throw new Error('Tabs.* components must be used inside <Tabs>')
  return ctx
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs()
  return (
    <button role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  )
}
```

Why use it:

- **Flexible layout without "prop explosion"**: no `tabs={[...]}` array plus `renderLabel`, `tabClassName` and a dozen other props.
- Each piece stays small and is styled or extended independently.

Design points:

- **Fail loudly** when a part is used outside its parent, as in `useTabs` above.
- Support both **controlled and uncontrolled** state on the parent (`value` / `defaultValue` / `onValueChange`).
- Let the parent wire up **accessibility**: generate ids with `useId` and connect `aria-controls` and `aria-labelledby`.
- **Memoize the context value** if the parts are heavy.

Trade-offs: a larger API surface, and TypeScript cannot enforce a valid structure (such as a `Tab` without a `Panel`). Libraries like Radix UI are built on this pattern.
