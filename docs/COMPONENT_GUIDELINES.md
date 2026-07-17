# Component Standards

## Composition
- Prefer Server Components where possible.
- Use Client Components (`"use client"`) strictly at the leaves of the tree.

## Naming
- PascalCase for files `Button.tsx` and functions `function Button()`.

## State
- Avoid `useState` if state can be derived from URL (searchParams) or React Query.