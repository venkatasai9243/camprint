# Engineering Standards

- **Naming**: camelCase for utils/hooks, PascalCase for components/types, kebab-case for folders.
- **Error Handling**: Use custom Error Classes. Never raw throw strings.
- **Logging**: Use a structured logger service (no `console.log` in prod).
- **Imports**: Absolute imports `@/` ordered by external, internal, styles.