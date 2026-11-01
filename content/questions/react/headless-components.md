---
title: What is a headless component, and how does it apply inversion of control?
category: react
level: senior
tags: [component-patterns, hooks]
sources: []
---

A **headless component or hook provides behavior, state and accessibility, but no markup or styles**. The consumer renders everything. Examples are TanStack Table, Downshift, React Aria hooks and Headless UI. It is **inversion of control**: instead of the component deciding the UI and growing a new prop for every design request, it **hands rendering back to the consumer**.

```tsx
function useDisclosure(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const panelId = useId()
  return {
    open,
    getTriggerProps: () => ({
      'aria-expanded': open,
      'aria-controls': panelId,
      onClick: () => setOpen(o => !o),
    }),
    getPanelProps: () => ({ id: panelId, hidden: !open }),
  }
}
// <MyButton {...d.getTriggerProps()}>Details</MyButton> <section {...d.getPanelProps()}>…</section>
```

Why it helps:

- Avoids the **"apropcalypse"**: a styled component that keeps adding `variant`, `renderIcon`, `itemClassName` props until nobody understands the combinations.
- One logic layer works with **any design system**, and the logic is testable on its own.
- Common techniques: hooks returning **prop getters** (as above), **render props**, **compound components**, and the **state reducer** pattern that lets consumers override state transitions.

Trade-offs:

- **More work for the consumer**, who writes all the markup.
- Accessibility can break if the consumer forgets to spread the prop getters, so document it and make the getters merge user handlers.
- Overkill for one-off app components. It pays off in **libraries and design systems** with many visual variants.

A common layering: headless core, then styled design-system components built on it, then app code that mostly uses the styled layer.
