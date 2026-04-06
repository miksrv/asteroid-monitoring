# ROADMAP — Asteroid Monitoring

Tasks are sorted by priority: Critical → High → Medium → Low.

---

## [6] API key passed in URL — potential secret exposure

**Priority:** Low
**Category:** Security / Documentation
**Files:** `api/api.ts`

**Description:**
`process.env.NEXT_PUBLIC_API_KEY` is embedded directly in the request URL. The key is visible in browser network logs and in the HTML. NASA NeoWS API does not support `X-Api-Key` header (returns CORS error), so passing the key in the URL is the only option.

**Recommendation:**
Document this limitation in the README. Consider adding retry logic in `fetchBaseQuery` for rate-limit (429) responses.

---

## [9] `Detailed` component — missing API error state

**Priority:** High
**Category:** Bug / Improvement
**Files:** `components/Detailed/Detailed.tsx`

**Description:**
`Detailed.tsx` uses `useGetAsteroidDataQuery`, but only destructures `data` and `isLoading`. The `isError` state is ignored. If the API returns 404 or 500, the user will see an infinite skeleton with no indication of what went wrong.

**Recommendation:**

```tsx
const { data: asteroidData, isLoading: asteroidLoading, isError } = API.useGetAsteroidDataQuery(asteroidId!, {
    skip: !asteroidId
})

// In JSX:
if (isError) return <div>Failed to load asteroid data</div>
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

## [15] `next-i18next` installed but unused — `react-i18next` used directly instead

**Priority:** Medium
**Category:** Refactoring
**Files:** `next-i18next.config.js`, `pages/index.tsx`, `package.json`

**Description:**
`next-i18next` is installed (`^15.4.3`) but not used. Components import `useTranslation` from `react-i18next` directly, bypassing the Next.js i18n layer. `appWithTranslation` does not wrap `_app.tsx`, `serverSideTranslations` is never called, and `next-i18next.config.js` has no effect.

**Recommendation:**
Either remove `next-i18next` entirely and keep using `react-i18next` with a plain translation object, or fully integrate `next-i18next` (`appWithTranslation` in `_app.tsx`, `getStaticProps` with `serverSideTranslations` in pages). For static export (`output: 'export'`) use `getStaticProps`, not `getServerSideProps`.

---

## [17] `deploy.yml` uses Node.js 22 instead of 20.11.0 from `.nvmrc`

**Priority:** Medium
**Category:** DevOps
**Files:** `.github/workflows/deploy.yml`

**Description:**
`.nvmrc` specifies `20.11.0`. `checks.yml` and `sonarcloud.yml` already use `node-version-file: '.nvmrc'`, but `deploy.yml` still hardcodes `node-version: 22`. This mismatch can cause behavioral differences between CI checks and production deploys.

**Recommendation:**

```yaml
node-version-file: '.nvmrc'
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

