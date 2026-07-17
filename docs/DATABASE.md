# Database Standards

## Naming
- tables: snake_case plural (`users`, `print_orders`)
- columns: snake_case

## Keys & IDs
- Primary Keys: UUID v4
- Foreign Keys: `table_name_id`

## Soft Delete
- Use `deleted_at` timestamp rather than hard deletion.

## Audit
- Every table needs `created_at` and `updated_at`.