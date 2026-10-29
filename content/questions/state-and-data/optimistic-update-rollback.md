---
title: How do you implement an optimistic update with rollback in TanStack Query?
category: state-and-data
level: mid
tags: [data-fetching, caching, state]
sources:
  - title: Optimistic Updates – TanStack Query docs
    url: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
---

Update the cache **before** the request finishes, keep a **snapshot** of the previous data, restore it **if the mutation fails**, and **invalidate** at the end to sync with the server.

```ts
useMutation({
  mutationFn: addTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    const previous = queryClient.getQueryData<Todo[]>(['todos'])
    queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [...old, newTodo])
    return { previous }
  },
  onError: (_err, _newTodo, onMutateResult) => {
    queryClient.setQueryData(['todos'], onMutateResult?.previous)
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})
```

Why each step matters:

- **`cancelQueries`** stops an in-flight refetch from overwriting the optimistic value with old data.
- The value returned from **`onMutate`** is passed to `onError`, which is where the rollback snapshot comes from.
- **`onSettled`** runs on success and error, so the cache always ends up matching the server — including server-generated fields like ids and timestamps.

A simpler alternative for a single place in the UI: don't touch the cache, render the pending item from the mutation's **`variables`** while `isPending` is true.
