# CHANGELOG

## 1.1.10

### Patch Changes

- Refactored useLocalStorage hook to use a typed generic API; eliminated double JSON serialization by storing parsed values directly in state; exposed a setValue that updates both state and localStorage atomically; added typeof window === 'undefined' SSR guards to prevent crashes during Next.js static generation.
- Replaced getAsteroidsList and getAsteroidData RTK endpoints from builder.mutation to builder.query, enabling RTK Query caching, deduplication, and skip behavior; updated all call sites in pages/index.tsx and components/Detailed/Detailed.tsx.
- Added React ErrorBoundary class component; wrapped Spacemap in Detailed.tsx to catch spacekit.js rendering errors, and wrapped the root app in _app.tsx as a top-level safety net.
- Added isError handling in the Detailed component; replaced the infinite skeleton on API failure with a user-facing error message.
- Added pages/_document.tsx to set html lang="ru" for improved accessibility and SEO; added canonical URL and openGraph.url to NextSeo in pages/index.tsx.
- Fixed OrbitingBody enum to use string value 'Earth' instead of numeric 0, matching the NASA API response; added endpoint comments to api/types.ts documenting the intentional difference between number (feed endpoint) and string (detail endpoint) velocity and distance fields.
- Replaced external favicon URL in Footer.tsx with local /favicon.ico; removed empty title attributes from footer links.
- Added .env.example documenting the required NEXT_PUBLIC_API_KEY environment variable.

## 1.1.9

### Patch Changes

- i18n: implemented client-side internationalization via react-i18next and i18next-browser-languagedetector. On first visit the browser language is detected automatically; the choice is persisted in localStorage. All hardcoded UI strings in Asteroid, Countdown, Counter, Header, and pages/index.tsx replaced with translation keys. Locale files: public/locales/ru/common.json and public/locales/en/common.json.
- i18n: added LanguageSwitcher component in the site header (RU / EN toggle). Language switches instantly without a page reload.
- i18n: formatDate now switches the dayjs locale together with the app language, so date strings like "D MMMM YYYY" render in the correct language.
- fix: replaced document.getElementById with useRef in Spacemap; added useEffect cleanup that sets container.innerHTML = '' on unmount, releasing the WebGL context that spacekit.js previously left alive.
- fix: corrected typos on the index page — "Пожалуста" → "Пожалуйста", "астеродиы" → "астероиды", "актуальнные" → "актуальные".
- fix: removed duplicated asteroidsData entry from the useEffect dependency array in pages/index.tsx.
- tests: migrated all tests from a centralised __tests__/ directory to sit next to their source files. Added 106+ unit tests across all components (Asteroid, Countdown, Counter, Detailed, Footer, Header, Spacemap), utilities (date, helpers, useLocalStorage), and the API layer (api, store).
- ci: updated sonarcloud.yml and checks.yml to run tests and upload lcov coverage before the scan. Configured jest.config.ts with coverageReporters lcov/clover/text/text-summary and updated sonar-project.properties with correct source/test paths.
- ci: GitHub Actions workflows now use node-version-file .nvmrc to match the local development environment (Node.js 20.11.0).
- docs: added ROADMAP.md with 34 prioritised tasks (Critical to Low) covering bugs, performance, accessibility, security, and DevOps improvements found during a full codebase audit.

## 1.1.8

### Patch Changes

- Added CLAUDE.md with project usage, architecture, tooling, and environment notes for Claude Code
- Updated `tsconfig.json`: changed `moduleResolution` from `node` to `bundler`
- Upgraded Next.js to 16.2.2
- Upgraded React and React DOM to 19.2.4
- Upgraded `@reduxjs/toolkit` to 2.11.2
- Upgraded `simple-react-ui-kit` to 1.7.12
- Upgraded `i18next` to 25.10.10
- Upgraded `react-i18next` to 16.6.6
- Upgraded `dayjs` to 1.11.20
- Upgraded `sass` to 1.99.0
- Upgraded `next-i18next` to 15.4.3
- Upgraded ESLint, TypeScript-ESLint, Prettier, Jest and related dev dependencies

## 1.1.7

### Patch Changes

- Upgraded Node.js version to 22
- Upgraded Dependencies
- Upgraded Next.js to 16

## 1.1.6

### Patch Changes

- Upgraded Dependencies

## 1.1.5

### Patch Changes

- Fixed dialog header height
- Upgraded UI Libraries

## 1.1.4

### Patch Changes

- Upgraded UI Libraries
- Update main theme.css
- Created new config for ESLint and Prettier
- Fixed config for Jest
- Fixed code-style by ESLint and Prettier
- Delete `install-state.gz` from repository

## 1.1.3

### Patch Changes

- Fixed issue: blink overlay on load asteroid detailed data
- Translated Countdown locales to RU
- Implemented a new UI Detailed component to show asteroid orbit
- Updated UI Libraries
- Create .htaccess
- Updated @reduxjs/toolkit version

## 1.1.2

### Patch Changes

- Updated README.md
- Fixed main page loader
- Fixed code-style for Header UI component

## 1.1.1

### Patch Changes

- Improved styles for Asteroid and Footer UI components
- Added some information for package.json
- Fixed HTML header for dark mode
- Refactoring and optimized main page
- Improved show loading spinner
- Added local model `A1046.M1863.obj` for asteroid
- Changed directory for local images
- Improved global styles and CSS variables
- Improved styles for Dialog UI component
- Improved README.md
- Fixed UI manifest, UI dark mode
- Changed UI modal size, added close button

## 1.1.0

### Minor Changes

- Created EditorConfig
- Updated UI Libraries, added new packages
- Added new ESLint and Prettier config
- Updated Yarn version
- Update next.config.js
- Added i18next config
- Implemented UI CSS theme variables
- Added SVG images
- Implemented UI date helper
- Refactoring API, added new endpoint
- Implemented new API NASA TS interfaces
- Updated Jest config
- Refactoring global UI styles
- Create earthtexture.jpg
- Code-style for footer UI component
- Removed old images
- Implemented UI Dialog Component
- Removed old functions
- Updated UI API Types
- Update LICENSE
- Improved UI styles
- Implemented UI tools functions
- Added templates for i18next locales
- Refactoring UI Components
- Implemented Spacemap UI Component
- Updated README.md
- Added CHANGELOG.md
