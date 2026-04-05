# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev           # Start development server
yarn build         # Production build (static export)
yarn test          # Run tests
yarn test:watch    # Run tests in watch mode
yarn eslint:check  # Check linting
yarn eslint:fix    # Auto-fix lint issues
yarn prettier:check # Check formatting
yarn prettier:fix  # Auto-fix formatting
```

Node.js version: 20.11.0 (see `.nvmrc`). Package manager: Yarn 4.9.2.

Requires `NEXT_PUBLIC_API_KEY` in `.env` — a NASA NeoWS API key.

## Architecture

**Next.js static site** (`output: 'export'` in `next.config.js`) — no server, deploys as static HTML via FTP.

**Data flow:**

1. `pages/index.tsx` triggers NASA NeoWS API call via RTK Query
2. Response cached in `localStorage` to minimize API calls
3. Redux store (RTK Query) provides data to components
4. `next-redux-wrapper` handles SSG state hydration

**Key layers:**

- `api/api.ts` — RTK Query endpoints (`getAsteroidsList`, `getAsteroidData`)
- `api/types.ts` — TypeScript interfaces for NASA API responses
- `api/store.ts` — Redux store with RTK Query middleware
- `components/` — Feature components, each folder has `index.ts` re-export
- `tools/` — `date.ts` (dayjs formatting), `helpers.ts` (distance formatting), `useLocalStorage.ts`
- `styles/theme.css` — CSS variables; supports dark mode

**Localization:** Russian (default) and English via `next-i18next`. Translation files live in `public/locales/`.

**3D visualization:** `components/Spacemap/` uses `spacekit.js` with a real asteroid OBJ model (`public/A1046.M1863.obj`).

## Code Style

- 4-space indentation, single quotes, no semicolons, 120-char line width (see `.prettierrc`)
- `@/*` path alias maps to project root
- CSS Modules with `.module.sass` files for component-scoped styles
- `reactStrictMode: false` (intentional — prevents double rendering with spacekit.js)
