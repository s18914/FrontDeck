---
title: As a component author, how do you design a component that can be either controlled or uncontrolled?
category: react
level: senior
tags: [component-patterns, state, forms]
sources:
  - title: Sharing State Between Components – React docs
    url: https://react.dev/learn/sharing-state-between-components
---

Follow the convention of native inputs: **`value` + `onChange`** for controlled mode, where the parent owns the state, and **`defaultValue`** for uncontrolled mode, where the component keeps internal state initialized once. The component picks the mode by checking whether `value` is defined, and **always calls `onChange`**, so parents can observe changes in both modes.

```tsx
function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  function setValue(next: T) {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }
  return [current, setValue] as const
}
```

Design rules:

- **Do not switch modes** during the component's lifetime. Warn in development if `value` goes from defined to `undefined`, like React does for inputs.
- **`defaultValue` is read only on mount.** Changing it later does nothing. Document that, and let parents reset the component with a `key`.
- **Name props consistently**: `open` / `defaultOpen` / `onOpenChange`, `value` / `defaultValue` / `onValueChange`. Radix UI and many design systems use this convention.
- **Do not copy props into state with an effect.** That "sync" pattern causes stale values and extra renders, and is exactly the bug this design avoids.

Choosing the default: **uncontrolled** is simpler for consumers and cheaper, since the parent does not re-render on every change. **Controlled** is needed when the parent must validate, transform, persist or drive the value from elsewhere, for example a "Reset" button or syncing with the URL. Offering both lets each caller choose.
