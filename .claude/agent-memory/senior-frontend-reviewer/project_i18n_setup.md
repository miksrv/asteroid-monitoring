---
name: i18n architecture decision
description: Why pure react-i18next (not next-i18next) was chosen, mock setup, and test key convention
type: project
---

The project uses pure `react-i18next` + `i18next-browser-languagedetector` instead of `next-i18next` wrappers.

**Why:** `output: 'export'` (static site) is incompatible with `next-i18next` routing wrappers (`appWithTranslation`, `serverSideTranslations`). Using them would break the static build.

**How to apply:** When adding new i18n features — always use `useTranslation()` from `react-i18next`, never from `next-i18next`. The `i18n/config.ts` initialises i18next as a side-effect import in `pages/_app.tsx`. The `I18nextProvider` wraps the Redux `Provider`.

**Test key convention:** Because `__mocks__/react-i18next.tsx` returns the key as-is (`t(k) => k`), all test assertions must check for translation keys (e.g. `'asteroid.approachDate'`) not the actual Russian/English strings. Mock files for i18next live at:
- `__mocks__/react-i18next.tsx`
- `__mocks__/i18next-browser-languagedetector.ts`

Both are mapped in `jest.config.ts` via `moduleNameMapper`. The `LanguageDetector` mock class requires `public` accessibility modifiers on all properties due to `@typescript-eslint/explicit-member-accessibility`.

**Locale files:** `public/locales/ru/common.json` and `public/locales/en/common.json`. Inline-imported in `i18n/config.ts` — no HTTP backend needed for static export.

**localStorage key for language:** `'language'` (set via `lookupLocalStorage` in detector config).
