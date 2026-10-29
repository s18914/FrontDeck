---
title: What is the difference between the testing pyramid and the testing trophy?
category: testing
level: mid
tags: [mocking]
sources:
  - title: The Testing Trophy and Testing Classifications – Kent C. Dodds
    url: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
---

Both describe **how to distribute tests** across levels. The **pyramid** says: **mostly unit tests**, fewer integration tests, very few E2E tests. The **trophy**, popular in frontend, says: **mostly integration tests**, built on a base of **static analysis**.

**Pyramid** reasoning: unit tests are fast, cheap and precise, while higher-level tests are slow and brittle, so keep them few.

**Trophy** layers, bottom to top:

1. **Static** — TypeScript and ESLint catch typos and type errors for free.
2. **Unit** — pure logic, utils, reducers.
3. **Integration** — the biggest part: components rendered together with React Testing Library, network mocked with MSW.
4. **E2E** — a handful of critical flows in Playwright.

The trophy's argument is **confidence per cost**. In UI code most bugs live in how pieces **connect** (props, state, effects, API responses), which isolated unit tests with heavy mocking miss. Modern tools made integration tests nearly as fast as unit tests, so they give the best return.

Neither is a strict rule — the point is to choose test types consciously, not to hit a ratio.
