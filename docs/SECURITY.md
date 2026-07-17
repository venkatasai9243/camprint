# Security Standards

## Authentication
- Enforced via Edge Middleware.
- No secrets hardcoded.

## Validation
- Zod on ALL inputs (client & server).

## OWASP Checklist
- XSS prevented via React.
- CSRF mitigated by SameSite cookies.
- SQLi prevented by Prisma/Supabase bindings.

## Rate Limiting
- Use Vercel KV or Supabase rate limiting per IP/User.