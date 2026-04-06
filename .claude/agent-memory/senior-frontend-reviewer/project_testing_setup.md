---
name: Testing setup decisions
description: Non-obvious Jest configuration and mock decisions for this project
type: project
---

`simple-react-ui-kit` is an ESM-only package that Jest cannot transform by default. It is mocked via `__mocks__/simple-react-ui-kit.tsx` with a manual `moduleNameMapper` entry in `jest.config.ts`. The mock exports `Button`, `Skeleton`, `Dialog`, and `cn`.

**Why:** The package `dist/index.esm.js` uses ES module syntax incompatible with Jest's CommonJS transform. Adding it to `transformIgnorePatterns` exceptions was less stable than a manual mock.

**How to apply:** Any new component that imports from `simple-react-ui-kit` will be covered by the existing mock automatically. If new exports are needed, add them to `__mocks__/simple-react-ui-kit.tsx`.

---

`next/image` is mocked via `__mocks__/next/image.tsx` and a `moduleNameMapper` entry. The mock renders a plain `<img>` tag accepting both string `src` and static-import object `src`.

**Why:** Static image imports (`import img from '@/public/...'`) are resolved by `identity-obj-proxy` (returns `'default'` string), but Next.js `Image` component validates the object shape at runtime and throws. The mock bypasses this.

**How to apply:** Already active globally via `moduleNameMapper`.

---

The pre-existing `date.test.ts` had a timezone-sensitive test using `new Date('2024-01-01T00:00:00.000Z')` which failed in UTC-offset environments. Fixed by using `2024-06-15T12:00:00.000Z` (noon UTC, safely in 2024 everywhere).
