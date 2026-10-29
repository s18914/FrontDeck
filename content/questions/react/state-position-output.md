---
title: The user clicks Add three times, then Switch – what number does the counter show?
category: react
level: mid
tags: [state, rendering, output-prediction]
sources: []
---

```tsx
function Counter({ person }: { person: string }) {
  const [score, setScore] = useState(0)
  return (
    <div>
      <p>{person}: {score}</p>
      <button onClick={() => setScore(s => s + 1)}>Add</button>
    </div>
  )
}

function Scoreboard() {
  const [isTaylor, setIsTaylor] = useState(true)
  return (
    <>
      {isTaylor ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
      <button onClick={() => setIsTaylor(!isTaylor)}>Switch</button>
    </>
  )
}
```

<!-- answer -->

It shows **"Sarah: 3"**. The score is not reset.

React does not care which JSX branch produced the element. Both branches render a **`Counter` at the same position** in the tree, so React sees the **same component type in the same place** and keeps the existing instance and its state. Only the `person` prop changes.

To give each player separate state, make React see two different components:

```tsx
{isTaylor
  ? <Counter key="Taylor" person="Taylor" />
  : <Counter key="Sarah" person="Sarah" />}
```

With different **keys**, switching unmounts one counter and mounts the other, so Sarah starts at `0`. Note that Taylor's score is then lost too, because unmounting destroys state. Rendering them in **different positions** (`{isTaylor && <Counter …/>}{!isTaylor && <Counter …/>}`) has the same resetting effect.
