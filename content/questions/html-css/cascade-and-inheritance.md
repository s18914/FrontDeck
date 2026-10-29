---
title: How does the CSS cascade decide which declaration wins, and how is it different from inheritance?
category: html-css
level: mid
tags: [styling]
sources:
  - title: Introduction to the CSS cascade – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction
---

The **cascade** resolves conflicts when **several declarations target the same property on the same element**. **Inheritance** fills in a value when **no declaration targets the element at all**, by copying it from the parent.

The cascade compares, in this order, and stops at the first difference:

1. **Origin and importance** — browser defaults < author styles; `!important` flips the order, so important user-agent and user styles beat important author styles.
2. **Context** — e.g. normal styles in the light DOM vs shadow DOM.
3. **Element-attached styles** — an inline `style` attribute beats any selector-based rule.
4. **Cascade layers** — unlayered styles beat layered ones (reversed for `!important`).
5. **Specificity** — IDs, then classes, then elements.
6. **Order of appearance** — the later declaration wins.

Inheritance:

- Only some properties inherit by default, mostly **text-related** ones: `color`, `font-*`, `line-height`, `visibility`.
- Box properties like `margin`, `border`, `width` and `background` **don't inherit**.
- You can force it with keywords: `inherit`, `initial`, `unset`, `revert`.

A common gotcha: a rule targeting the element **always beats an inherited value**, even a parent rule with an ID. Inheritance has no specificity at all.
