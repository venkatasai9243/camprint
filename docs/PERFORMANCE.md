# Performance Guide

## Images
- Always use `next/image` with proper `alt`, `width`, and `height`.

## Code Splitting
- Use `next/dynamic` for heavy client components (charts, modals).

## Caching
- Leverage React Query `staleTime` and Next.js Data Cache.

## Bundle
- Keep bundle size minimal. Audit via `@next/bundle-analyzer`.