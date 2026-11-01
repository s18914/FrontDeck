---
title: How do you write a generic React component, for example a typed list or select?
category: typescript
level: mid
tags: [generics, component-patterns]
sources: []
---

Add a **type parameter to the component function** and use it in the props. TypeScript infers it from the props you pass, so callbacks get the correct item type without casting.

```tsx
type ListProps<T> = {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  return <ul>{items.map((item) => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>
}

<List items={users} getKey={(u) => u.id} renderItem={(u) => u.name} />
// T is inferred as User, so u is typed
```

Details that come up:

- With an **arrow function in a `.tsx` file**, write `<T,>` (trailing comma) so the parser does not read `<T>` as JSX: `const List = <T,>(props: ListProps<T>) => …`.
- Add a **constraint** if you need something from the item: `<T extends { id: string }>` lets you drop `getKey`.
- **`React.FC` cannot express generics**, which is one reason plain function components are preferred.
- Wrapping in **`memo`** loses the generic signature; you need a type assertion on the result to keep it.

The win over `items: any[]` or a union is that the **link between `items` and the callbacks** is preserved.
