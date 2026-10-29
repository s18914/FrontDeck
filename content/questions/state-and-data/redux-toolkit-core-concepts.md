---
title: What are the store, slices, actions and reducers in Redux Toolkit?
category: state-and-data
level: junior
tags: [state]
sources:
  - title: Redux Overview and Concepts – Redux docs
    url: https://redux.js.org/tutorials/essentials/part-1-overview-concepts
---

Redux keeps global state in one **store**. The UI **dispatches actions** (plain objects describing what happened), **reducers** compute the next state from the current state and the action, and components read data with **selectors**.

- **Store** — created with `configureStore`, holds the whole state tree and sets up DevTools and middleware.
- **Action** — `{ type: 'cart/itemAdded', payload: item }`.
- **Reducer** — a **pure function** `(state, action) => newState`, with no side effects.
- **Slice** — `createSlice` groups the reducers for one feature and **generates the action creators** for you.

```ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as Item[] },
  reducers: {
    itemAdded(state, action: PayloadAction<Item>) {
      state.items.push(action.payload)
    },
  },
})
export const { itemAdded } = cartSlice.actions
```

Redux Toolkit is the **official, recommended** way to write Redux. Reducers can "mutate" because it uses **Immer** under the hood.
