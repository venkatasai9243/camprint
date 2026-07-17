# BLINTZY Web - Architecture & Technical Foundation

## Welcome to BLINTZY
**Campus Printing. Delivered Smarter.**
This is the foundational codebase for BLINTZY's premium campus printing and document delivery platform. 

Our core philosophy: We build premium, world-class experiences inspired by Apple, Stripe, Linear, and Vercel. We abhor cheap templates, excessive glassmorphism, and neon gaming UIs. We keep things clean, minimal, robust, and lightning fast.

## Tech Stack Overview
- **Core Framework**: Next.js 15 (App Router) + React 19
- **Language**: Strict TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui + Framer Motion
- **State & Data**: TanStack Query (React Query) + Zustand + Axios
- **Forms & Validation**: React Hook Form + Zod
- **Backend & Auth**: Supabase (Edge Functions, Postgres, Auth, Realtime)
- **Tooling**: ESLint, Prettier, Husky, Lint Staged

## Directory Architecture
We follow **Clean Architecture** and **Feature-First Architecture** to ensure this codebase scales comfortably to 20+ developers.

### `src/` Root
- `app/`: Next.js App Router. Contains pages, layouts, and API routes. Strictly routing.
- `assets/`: Static assets such as images, icons, and fonts.
- `components/`: Global, highly reusable UI components (e.g., our design system buttons, inputs).
- `config/`: App-wide configuration, environment variables schema, and constants.
- `design-system/`: Design tokens, theme config, typography, spacing definitions.
- `features/`: **The core of our app**. Isolated feature modules (Auth, Orders, Profile). 
- `hooks/`: Global custom React hooks used across multiple features.
- `lib/`: Third-party library initializations (Supabase client, Axios instances).
- `middleware/`: Next.js Edge Middlewares (Auth guarding, analytics).
- `providers/`: React Context providers (Theme, Auth, QueryClient).
- `services/`: Global API services and Edge Function wrappers.
- `store/`: Global Zustand state slices.
- `styles/`: Global CSS and Tailwind entry points (`globals.css`).
- `types/`: Global TypeScript definitions and Zod schemas.
- `utils/`: Reusable helper functions and formatting utilities.

### Inside `features/[feature-name]/`
Every feature is completely self-contained:
- `components/`: UI components specific to this feature.
- `hooks/`: Hooks that only this feature uses.
- `services/`: API calls and data fetching logic for this feature.
- `types/`: Types and schemas specific to this feature.
- `utils/`: Helper functions specific to this feature.

## Engineering Rules
1. **Never Hardcode**: Use design tokens defined in our design system.
2. **DRY & KISS**: Don't repeat yourself. Keep it ridiculously simple.
3. **Strict TypeScript**: No `any` types allowed anywhere.
4. **Absolute Imports**: Always use `@/components/`, never `../../components/`.
5. **Pre-commit Hooks**: Husky and Lint Staged will automatically format and lint your code before committing. If it doesn't pass, it doesn't commit.

## Setup Instructions for Developers
1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and populate the Supabase credentials.
4. Run `npm run dev` to start the development server.
