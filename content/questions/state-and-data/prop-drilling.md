---
title: What is prop drilling and how can you avoid it?
category: state-and-data
level: junior
tags: [state, component-patterns, context]
sources: []
---

**Prop drilling** means passing a prop through several layers of components that **don't use it themselves**, only so it can reach a deeply nested child. It makes components noisy and hard to refactor.

Ways to fix it, roughly in the order you should try them:

1. **Component composition** — pass JSX through `children` or slot props, so the parent renders the deep child directly and the middle layers never see the data.
2. **Move state closer** to where it is used, if only one branch needs it.
3. **Context** — for values many components need, like the current user, theme or locale.
4. **A state library** (Zustand, Redux) — when many distant components read and update the same frequently changing data.

```tsx
<Layout sidebar={<UserMenu user={user} />}>
  <Dashboard />
</Layout>
```

Passing props two or three levels down is fine. Don't reach for context just to avoid a few explicit props.
