---
title: What is React and what does it mean that it is declarative?
category: react
level: junior
tags: [rendering]
sources: []
---

React is a **JavaScript library for building user interfaces out of components**. It is declarative: you describe **what the UI should look like for the current state**, and React works out how to update the DOM to match.

Compare the two styles:

- **Imperative** (plain DOM): "find the button, change its text, add a class, remove the spinner". You write every step and must keep the DOM in sync yourself.
- **Declarative** (React): `return loading ? <Spinner /> : <Button>Save</Button>`. You change the state, React re-renders and **updates only what changed**.

Why it matters:

- UI becomes a **function of state**, so it is easier to predict and test.
- Fewer bugs from the DOM drifting out of sync with your data.
- Components are reusable pieces that combine.

React itself is only the UI layer. Routing, data fetching and server rendering come from frameworks such as **Next.js**.
