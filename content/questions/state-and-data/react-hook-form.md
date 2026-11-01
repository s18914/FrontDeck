---
title: When would you use a form library like React Hook Form instead of controlled inputs?
category: state-and-data
level: mid
tags: [forms, state]
sources:
  - title: Get Started – React Hook Form
    url: https://react-hook-form.com/get-started
---

Controlled inputs are fine for **small forms**. A form library pays off when the form is **large or complex**: many fields, validation rules, dynamic field lists, multi-step flows, or noticeable typing lag.

Why React Hook Form helps:

- It is built on **uncontrolled inputs** registered via refs, so typing does **not re-render the whole form** on each keystroke, unlike one big `useState` object.
- It tracks **errors, dirty and touched fields** and submission state for you.
- It integrates with **schema validation** (Zod, Yup) through resolvers, so the same schema can validate on the client and the server.
- It has helpers for **field arrays** and for wrapping controlled UI components (`Controller`).

```tsx
const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
  resolver: zodResolver(schema),
})

<input {...register('email')} />
{errors.email && <p>{errors.email.message}</p>}
```

When not to use it: a two-field login or newsletter form. There, controlled state or a plain `<form>` with React 19 **form actions** is simpler. Always keep **server-side validation** too — client validation is only for user experience.
