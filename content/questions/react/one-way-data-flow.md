---
title: What does one-way data flow mean in React, and how does a child send data to its parent?
category: react
level: junior
tags: [state]
sources: []
---

Data in React flows **down**: a parent passes values to children through props, and children cannot modify them. To send something **up**, the parent passes a **callback function** as a prop and the child calls it.

```tsx
function Parent() {
  const [query, setQuery] = useState('')
  return <SearchBox value={query} onSearch={setQuery} />
}

function SearchBox({ value, onSearch }: Props) {
  return <input value={value} onChange={e => onSearch(e.target.value)} />
}
```

Why React works this way:

- Every piece of state has **one owner**, so it is clear where a value comes from and who can change it.
- Bugs are easier to trace: follow props up the tree to the state that produced them.

By convention callback props are named `onSomething` and the handlers that implement them `handleSomething`.
