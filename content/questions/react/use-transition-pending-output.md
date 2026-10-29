---
title: What does this component log after one click when the update is wrapped in startTransition?
category: react
level: senior
tags: [concurrency, hooks, output-prediction]
sources: []
---

No StrictMode. The user clicks the button once.

```tsx
function Tabs() {
  const [tab, setTab] = useState('home')
  const [isPending, startTransition] = useTransition()
  console.log({ tab, isPending })

  function handleClick() {
    startTransition(() => {
      setTab('posts')
    })
  }

  return <button onClick={handleClick}>Posts</button>
}
```

<!-- answer -->

```ts
{ tab: 'home', isPending: false }   // mount
{ tab: 'home', isPending: true }    // urgent render after the click
{ tab: 'posts', isPending: false }  // transition render
```

Calling `startTransition` schedules **two separate updates** with different priorities:

1. An **urgent update** that sets `isPending` to `true`. It renders right away, with the **old** `tab` value. This is what lets you give instant feedback (dim the content, show a spinner on the button) while the old screen is still visible.
2. The **transition update**, which contains `setTab('posts')` together with `isPending` going back to `false`. They commit in the **same render**, so there is no frame where the new tab shows with a pending flag.

Variations an interviewer may probe:

- If the user clicks something else while the transition render is in progress, React can **interrupt and restart** it, so extra renders with `isPending: true` may appear.
- If the `posts` content **suspends**, React keeps showing render two (old tab, pending) until the data is ready, instead of a Suspense fallback.
- With a plain `setTab('posts')`, you would see only two logs, and there would be no pending render at all.
