# ROADMAP — Asteroid Monitoring

Tasks are sorted by priority: Critical → High → Medium → Low.

---

## [3] Duplicate dependency in useEffect in `pages/index.tsx`

**Priority:** Critical
**Category:** Bug
**Files:** `pages/index.tsx`

**Description:**
The line `}, [asteroidsData, asteroidsData, currentDate])` lists `asteroidsData` twice in the dependency array. This is a typo that does not trigger an ESLint error (the `react-hooks/exhaustive-deps` rule is disabled), but it indicates carelessness in the code.

**Recommendation:**

```tsx
}, [asteroidsData, currentDate])
```

---

## [4] `localStorage` mutation in RTK Query — potential cache desynchronization

**Priority:** High
**Category:** Bug / Refactoring
**Files:** `pages/index.tsx`, `tools/useLocalStorage.ts`

**Description:**
The app uses `localStorage` as the primary data store and RTK Query `mutation` only for network requests. This creates two sources of truth: `asteroidData` from `useMemo(JSON.parse(localStorage))` and `data` from RTK Query. When the API returns new data, it is written to `localStorage` via `setLocalStorage(JSON.stringify(data))`, but `useLocalStorage` does not react to an external `setValue` call — `storedValue` is only updated through `setStoredValue`. Additionally, `useLocalStorage` never writes to `localStorage` on initial mount, and `storedValue` does not update when the `key` changes.

**Recommendation:**
Move to a single source of truth: store data in Redux state (RTK Query cache) and use `localStorage` only for persistence on initialization. Alternatively — keep the current approach but explicitly separate reads and writes, removing `JSON.stringify(data)` from `useEffect` and calling `setValue` directly.

---

## [5] Incorrect use of `builder.mutation` instead of `builder.query`

**Priority:** High
**Category:** Refactoring / RTK Query
**Files:** `api/api.ts`

**Description:**
Both endpoints (`getAsteroidsList`, `getAsteroidData`) are defined as `mutation` even though they perform read-only GET requests. RTK Query `mutation` does not support automatic caching, request deduplication, `refetchOnMountOrArgChange`, and other features available in `query`. The current approach forfeits all RTK Query caching benefits.

**Recommendation:**
Redefine both endpoints as `builder.query`:

```ts
getAsteroidsList: builder.query<ApiNasaResponse, string>({
    query: (date) => `feed?api_key=${process.env.NEXT_PUBLIC_API_KEY}&start_date=${date}&end_date=${date}`
}),
getAsteroidData: builder.query<AsteroidData, number>({
    query: (id) => `neo/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
})
```

Update call sites to use `useGetAsteroidsListQuery` / `useGetAsteroidDataQuery`.

---

## [6] API key passed in URL — potential secret exposure

**Priority:** High
**Category:** Security
**Files:** `api/api.ts`

**Description:**
`process.env.NEXT_PUBLIC_API_KEY` is embedded directly in the request URL inside `fetchBaseQuery`. This is standard practice for static sites, but the key is visible in browser network logs, in the HTML (since it is a public env var), and in browser history. There is no protection against rate limit exhaustion or key leakage.

**Recommendation:**
Use `prepareHeaders` to pass the key as a header if the NASA API supports it. If not — document this risk in the README and add rate-limit handling (retry logic) in `fetchBaseQuery`.

---

## [7] Typos in user interface text

**Priority:** High
**Category:** Bug
**Files:** `pages/index.tsx`

**Description:**
The page text contains typos:

- "Пожалуста" instead of "Пожалуйста"
- "астеродиы" instead of "астероиды"
- "актуальнные" instead of "актуальные"

**Recommendation:**
Fix the typos directly in JSX. After implementing i18n this issue will disappear on its own, but for now — fix in place.

---

## [8] No Error Boundary in the application

**Priority:** High
**Category:** Bug / Improvement
**Files:** `pages/_app.tsx`, `components/Spacemap/Spacemap.tsx`, `components/Detailed/Detailed.tsx`

**Description:**
The application has no React Error Boundary. If `spacekit.js` throws during initialization (invalid orbital data, WebGL issue), the entire page will crash with a blank screen. Similarly, any error in `Detailed` or `Asteroid` will break the whole app.

**Recommendation:**
Create an `ErrorBoundary` component and wrap at least `<Spacemap>` and the asteroid list:

```tsx
<ErrorBoundary fallback={<div>Failed to load map</div>}>
    <Spacemap ... />
</ErrorBoundary>
```

---

## [9] `Detailed` component — missing API error state

**Priority:** High
**Category:** Bug / Improvement
**Files:** `components/Detailed/Detailed.tsx`

**Description:**
`Detailed.tsx` uses `useGetAsteroidDataMutation`, but only destructures `data` and `isLoading`. The `isError` and `error` states are ignored. If the API returns 404 or 500, the user will see an infinite skeleton with no indication of what went wrong.

**Recommendation:**

```tsx
const [getAsteroidData, { data, isLoading, isError }] = API.useGetAsteroidDataMutation()

// In JSX:
if (isError) return <div>Failed to load asteroid data</div>
```

---

## [10] Stale dependency in useEffect `getAsteroidData` — missing `asteroidId` in deps

**Priority:** High
**Category:** Bug
**Files:** `components/Detailed/Detailed.tsx`

**Description:**

```tsx
useEffect(() => {
    if (asteroidId) {
        void getAsteroidData(asteroidId)
    }
}, [asteroidId])
```

`getAsteroidData` is not included in the dependency array. Since `react-hooks/exhaustive-deps` is disabled in ESLint, this is not flagged. On every render `getAsteroidData` is a new function (from the mutation hook), but its absence from deps means a stale version may be called under certain conditions.

**Recommendation:**

```tsx
}, [asteroidId, getAsteroidData])
```

---

## [11] `useLocalStorage` — `window` not guarded against SSR (Next.js SSG)

**Priority:** High
**Category:** Bug
**Files:** `tools/useLocalStorage.ts`

**Description:**
The hook directly accesses `window.localStorage` in the `setValue` function, which is called outside of `useEffect`. During SSG, Next.js executes component code on the server where `window` is unavailable. Although `setValue` is currently only called inside `useEffect`, this is fragile architecture — any refactor could break SSR/SSG.

**Recommendation:**

```ts
const setValue = (value: T) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, JSON.stringify(value))
}
```

---

## [12] `OrbitingBody` enum has only `Earth = 0` and is not used correctly

**Priority:** Medium
**Category:** Bug / TypeScript
**Files:** `api/types.ts`

**Description:**

```ts
export enum OrbitingBody {
    Earth
}
```

`Earth` gets the numeric value `0` (numeric enum by default). In `AsteroidApproach` the field type is declared as `OrbitingBody | string`, making the enum useless. The NASA API returns the string `"Earth"`, not the number `0`. A numeric enum does not match a string value from the API.

**Recommendation:**

```ts
export enum OrbitingBody {
    Earth = 'Earth'
}
```

---

## [13] Duplicated interfaces in `api/types.ts`

**Priority:** Medium
**Category:** Refactoring
**Files:** `api/types.ts`

**Description:**
The file defines two sets of similar interfaces: `AsteroidApproach` (inside `AsteroidListData`) and `CloseApproachData` (inside `AsteroidData`). The `relative_velocity` fields have different types: `number` in `AsteroidApproach` vs. `string` in `RelativeVelocity`. Same for `miss_distance` — `number` in `AsteroidApproach` vs. `string` in `MissDistance`. This is because the NASA API returns strings for the detail object and numbers for the list, but duplicated interfaces without a comment are confusing.

**Recommendation:**
Add comments to each interface explaining which endpoint it corresponds to. Consider unifying with a generic type or union type.

---

## [14] Commented-out code — dead code in several files

**Priority:** Medium
**Category:** Refactoring
**Files:** `components/Asteroid/Asteroid.tsx` (lines 116–128), `pages/index.tsx` (lines 20–21), `.github/workflows/sonarcloud.yml` (lines 22–52), `.github/workflows/checks.yml` (lines 51–52)

**Description:**
`Asteroid.tsx` has a large block of commented-out JSX (asteroid details). `pages/index.tsx` has `useTranslation` commented out. The CI workflows have the dependency installation and test-run steps commented out — meaning tests are not executed in CI.

**Recommendation:**

1. Remove the commented-out JSX in `Asteroid.tsx` or implement the functionality.
2. Uncomment the test steps in CI after tests are written (Task 2).
3. Uncomment `useTranslation` after populating locale files.

---

## [15] `next-i18next` is configured but effectively unused

**Priority:** Medium
**Category:** Refactoring
**Files:** `next-i18next.config.js`, `pages/index.tsx`, all components

**Description:**
`next-i18next` is installed, configured with two locales (`ru`, `en`), but is not used in any component. `appWithTranslation` does not wrap `_app.tsx`. `serverSideTranslations` is not called on any page.

**Recommendation:**
Either fully integrate `next-i18next` (wrap `_app.tsx` with `appWithTranslation`, add `getStaticProps` with `serverSideTranslations`, use `useTranslation` in components), or remove the package and store translations in a plain constant object. For static export (`output: 'export'`) use `getStaticProps`, not `getServerSideProps`.

---

## [16] `sonarcloud.yml` — tests are not run before uploading coverage

**Priority:** Medium
**Category:** DevOps / CI/CD
**Files:** `.github/workflows/sonarcloud.yml`

**Description:**
The entire block for installing dependencies, running tests, and generating coverage is commented out. The SonarCloud scan runs without an up-to-date `coverage/lcov.info`, making coverage metrics in SonarCloud meaningless.

**Recommendation:**
Uncomment the CI steps, use Node.js 20 (per `.nvmrc`) instead of 22 (used in `checks.yml`), and ensure `yarn test` generates `coverage/lcov.info` before the SonarCloud scan step.

---

## [17] `checks.yml` uses Node.js 22 instead of 20.11.0 from `.nvmrc`

**Priority:** Medium
**Category:** DevOps
**Files:** `.github/workflows/checks.yml`, `.github/workflows/deploy.yml`

**Description:**
`.nvmrc` specifies version `20.11.0`, but both workflows (`checks.yml`, `deploy.yml`) use `node-version: 22`. This mismatch can lead to behavioral differences between local development and CI.

**Recommendation:**

```yaml
node-version-file: '.nvmrc'
```

Or explicitly:

```yaml
node-version: '20.11.0'
```

---

## [18] Inline styles in `Detailed.tsx` and `Spacemap.tsx`

**Priority:** Medium
**Category:** Code Style
**Files:** `components/Detailed/Detailed.tsx`, `components/Spacemap/Spacemap.tsx`

**Description:**
`Detailed.tsx` uses an inline style `style={{ height: \`${clientHeight - 200}px\` }}`. `Spacemap.tsx`uses`style={{ width: '100%', height: '100%', minHeight: '500px' }}`. The project uses CSS Modules (`.module.sass`), and inline styles violate the consistent styling approach. The magic number `200` is also undocumented.

**Recommendation:**
Create `styles.module.sass` for `Detailed` and `Spacemap` and move styles there. For dynamic height, use a CSS custom property:

```tsx
<div className={styles.container} style={{ '--dialog-height': `${clientHeight - 200}px` } as React.CSSProperties}>
```

---

## [19] `alt=""` on images — accessibility issue

**Priority:** Medium
**Category:** Accessibility
**Files:** `components/Footer/Footer.tsx`

**Description:**
In `Footer.tsx` the `<Image>` tag for the favicon has an empty `alt=""`, which is acceptable for decorative images, but the `<a>` wrapping it also has an empty `title=""`. The link is unidentifiable by screen readers. Additionally, the external image is loaded from `https://miksoft.pro/favicon.ico` — this is unreliable for a static site (the external resource may be unavailable).

**Recommendation:**
Add `aria-label` to the link. Replace the external favicon with a local file.

---

## [20] Missing `aria-label` on the close button and the "Details" button

**Priority:** Medium
**Category:** Accessibility
**Files:** `components/Asteroid/Asteroid.tsx`, `pages/index.tsx`

**Description:**
The "Подробнее" button has no context for screen readers — it is unclear which object it refers to. The dialog in `index.tsx` uses `<Dialog>` from `simple-react-ui-kit` — it is unknown whether it has the correct `role="dialog"` and `aria-label`.

**Recommendation:**

```tsx
<Button aria-label={`More details about asteroid ${data.name}`} ...>
    Подробнее
</Button>
```

---

## [21] Magic numbers in `diameterScaleValue` calculation

**Priority:** Medium
**Category:** Refactoring
**Files:** `components/Asteroid/Asteroid.tsx`

**Description:**
The values `0.3` and `0.7` in the scaling formula have no named constants and are undocumented. This makes the logic harder to understand and test.

**Recommendation:**

```ts
const MIN_SCALE = 0.3
const SCALE_RANGE = 0.7

const scale = MIN_SCALE + ((asteroidEstimatedSize - minDiameter) / (maxDiameter - minDiameter)) * SCALE_RANGE
```

---

## [22] `collectCoverageFrom` in `jest.config.ts` is too broad

**Priority:** Medium
**Category:** Testing / DevOps
**Files:** `jest.config.ts`

**Description:**
The current `collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', ...]` includes all project files, including `pages/`, `update.ts`, `next.config.js`, and other files that do not need test coverage. This inflates coverage statistics and slows down coverage collection.

**Recommendation:**
Narrow to target directories as required by SonarCloud:

```ts
collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'tools/**/*.{ts,tsx}',
    'api/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.ts'
]
```

---

## [23] `coverageReporters` not configured for SonarCloud

**Priority:** Medium
**Category:** DevOps / Testing
**Files:** `jest.config.ts`

**Description:**
`sonar-project.properties` specifies `sonar.javascript.lcov.reportPaths=coverage/lcov.info`, but `coverageReporters` in `jest.config.ts` is not explicitly set (Jest defaults to `['json', 'lcov', 'text', 'clover']`). For SonarCloud, `lcov` and `clover` must be explicitly declared.

**Recommendation:**

```ts
coverageReporters: ['lcov', 'clover', 'text', 'text-summary']
```

---

## [24] Missing `setupTests.config.tsx` in the repository

**Priority:** Medium
**Category:** Testing
**Files:** `jest.config.ts`

**Description:**
`jest.config.ts` references `setupFilesAfterEnv: ['<rootDir>/setupTests.config.tsx']`, but this file does not exist in the repository. If it is missing, Jest will fail on startup.

**Recommendation:**
Create `setupTests.config.tsx` with minimal content:

```tsx
import '@testing-library/jest-dom'
```

---

## [25] `Spacemap` not wrapped in `dynamic import` — potential SSR issue

**Priority:** Medium
**Category:** Performance / Bug
**Files:** `components/Detailed/Detailed.tsx`, `components/Spacemap/Spacemap.tsx`

**Description:**
`Spacemap` uses `document.getElementById` and `spacekit.js` (Three.js), which do not work in an SSR/SSG environment. Although `output: 'export'` minimizes the risk, a server-side render phase can occur when using `next-redux-wrapper`. The component is not protected against being called in a non-browser environment.

**Recommendation:**
Use dynamic import in `Detailed.tsx`:

```tsx
const Spacemap = dynamic(() => import('@/components/Spacemap'), { ssr: false })
```

---

## [26] `dangerouslySetInnerHTML` for Yandex Metrika in `_app.tsx`

**Priority:** Medium
**Category:** Security / Performance
**Files:** `pages/_app.tsx`

**Description:**
The Yandex Metrika script is injected via `dangerouslySetInnerHTML` inside the `App` component body. This is not best practice for Next.js — the correct way to add analytics is to use `<Script>` from `next/script` with `strategy="afterInteractive"`. The current approach blocks rendering and is not optimized by Next.js.

**Recommendation:**

```tsx
import Script from 'next/script'

;<Script
    id='yandex-metrika'
    strategy='afterInteractive'
    dangerouslySetInnerHTML={{ __html: `/* Yandex Metrika code */` }}
/>
```

---

## [27] SEO — missing `canonical` URL and `lang` attribute

**Priority:** Medium
**Category:** SEO
**Files:** `pages/index.tsx`, `pages/_app.tsx`

**Description:**
`NextSeo` does not include a `canonical` URL. `<html lang="...">` is not set (no custom `_document.tsx`). Without the `lang` attribute, screen readers do not know the language of the content. Additionally, `openGraph.url` is not specified.

**Recommendation:**
Create `pages/_document.tsx` with `<Html lang="ru">`. Add `canonical` to `NextSeo`:

```tsx
<NextSeo canonical='https://asteroid.miksoft.pro' />
```

---

## [28] Division by zero when `maxDiameter === minDiameter`

**Priority:** Medium
**Category:** Bug
**Files:** `components/Asteroid/Asteroid.tsx`

**Description:**
In `diameterScaleValue`, when `maxDiameter === minDiameter`, division by zero occurs: `(asteroidEstimatedSize - minDiameter) / (maxDiameter - minDiameter)` = `NaN`. `Math.max(0.3, Math.min(1, NaN))` returns `NaN`, which causes `transform: scale(NaN)` and breaks visual rendering.

**Recommendation:**

```ts
if (maxDiameter === minDiameter || maxDiameter - minDiameter === 0) return 1
```

---

## [29] `update.ts` is generated at build time — should not be committed to git

**Priority:** Low
**Category:** DevOps
**Files:** `update.ts`, `.gitignore`

**Description:**
The file `update.ts` is generated by a CI script (`echo "export const update = '...'" > update.ts`) and contains the build date. It is committed to the repository with a stale value of `'2025-04-09T11:00'`. This creates a false sense of freshness and produces constant diffs in git.

**Recommendation:**
Add `update.ts` to `.gitignore`. Create `update.template.ts` with a default value. In CI, generate `update.ts` from the template before building.

---

## [30] Missing `.env.example` file

**Priority:** Low
**Category:** DevOps
**Files:** `env/` (empty folder), project root

**Description:**
The `env/` folder exists but is empty. There is no `.env.example` or `.env.local.example` documenting the `NEXT_PUBLIC_API_KEY` variable. A new developer will not know which environment variables need to be configured.

**Recommendation:**
Create `.env.example`:

```
NEXT_PUBLIC_API_KEY=your_nasa_api_key_here
```

---

## [31] `Footer.tsx` uses `new Date()` — value recalculated on every render

**Priority:** Low
**Category:** Performance
**Files:** `components/Footer/Footer.tsx`

**Description:**
`formatDate(new Date().toISOString(), 'YYYY')` is computed on every component render. For displaying the current year this is not critical, but for a static site the year is better computed once.

**Recommendation:**

```tsx
const CURRENT_YEAR = new Date().getFullYear().toString()
```

Or use `useMemo` if the component renders frequently.

---

## [32] `simple-react-ui-kit` — no type documentation or version pinning

**Priority:** Low
**Category:** Improvement
**Files:** `components/Asteroid/Asteroid.tsx`, `components/Detailed/Detailed.tsx`

**Description:**
The project uses `simple-react-ui-kit` for `Button`, `cn`, `Dialog`, `Skeleton`. This dependency is the author's own library. Breaking changes may occur without warning on updates if there are no strict version constraints (currently set to `^1.7.12`).

**Recommendation:**
Pin the exact version in `package.json` (`"1.7.12"` without `^`), and review the CHANGELOG when updating.

---

## [33] `react/jsx-max-depth` exceeded in `pages/index.tsx`

**Priority:** Low
**Category:** Code Style
**Files:** `pages/index.tsx`

**Description:**
The ESLint rule `react/jsx-max-depth: ['warn', { max: 4 }]` is likely violated in `pages/index.tsx`, where JSX nesting reaches 5–6 levels (fragment → div.wrapper → div.asteroidList → Asteroid → ...). This violation signals a need for decomposition.

**Recommendation:**
Extract the asteroid list and loading block into separate components (`AsteroidList`, `LoadingState`).

---

## [34] No tests for the entire application

**Priority:** Low (addressed by Task 2)
**Category:** Testing
**Files:** all components and utilities

**Description:**
The project has no tests at all. `jest.config.ts` is configured and dependencies are installed (`@testing-library/react`, `@types/jest`), but the `__tests__` folder does not exist. The CI workflow has the test-run step commented out.

**Recommendation:**
Write unit tests for all components and utilities (covered by Task 2 of this ROADMAP).
