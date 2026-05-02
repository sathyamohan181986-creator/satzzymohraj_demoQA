# DemoQA Practice – Code Summary (Playwright / TypeScript)

## What the project does

This repository automates the **DemoQA** website (https://demoqa.com) using **Playwright** and **TypeScript**. It follows the **Page Object Model (POM)** pattern to keep page-specific actions separate from test logic. Test data is driven from an **Excel file** (`data.xlsx`), and results are captured as **screenshots** and an **HTML report** via Playwright's built-in reporter and GitHub Actions CI/CD.

---

## Folder structure explained

```
DEMOQA/
│
├── .github/workflows/
│   └── playwright.yml        # CI/CD pipeline — runs tests automatically on push/PR
│
├── Screenshot/
│   └── DemoQA Page.png       # Screenshots captured during test execution
│
├── src/
│   ├── actions/
│   │   └── LoginActions.ts   # Business-level workflows — orchestrates page object calls
│   │
│   ├── locators/
│   │   └── login.ts          # All element locators for the login/home page
│   │
│   ├── pages/
│   │   └── LoginPage.ts      # Page Object class — navigation, interactions, assertions
│   │
│   ├── test_data/
│   │   ├── data.xlsx         # Active Excel test data file used by tests
│   │   └── testdata.ts       # TypeScript interface/model matching the Excel columns
│   │
│   └── utils/
│       └── excelreader.ts    # Utility to read rows from data.xlsx using ExcelJS
│
├── test-results/             # Auto-generated — screenshots, videos, traces on failure
├── playwright-report/        # Auto-generated — Playwright HTML report
│
├── tests/
│   └── login.spec.ts         # Test spec — test cases for the login/home page flow
│
├── .gitignore
├── package.json              # Project dependencies and npm scripts
├── package-lock.json
├── playwright.config.ts      # Playwright configuration — browsers, timeouts, reporters
├── README.md
└── tsconfig.json             # TypeScript compiler configuration
```

---

## Step-by-step of the code implementation

### 1. Project setup
- Initialised a Node.js project (`package.json`) and added dependencies for `@playwright/test`, `typescript`, `exceljs`, and `allure-playwright`.
- Configured `playwright.config.ts` with base URL (`https://demoqa.com`), timeout settings, multi-browser projects (Chromium, Firefox, WebKit), and reporters (HTML + Allure).
- Configured `tsconfig.json` with strict TypeScript settings and path aliases (`@pages/*`, `@utils/*`) for clean imports.

### 2. Locators (`src/locators/login.ts`)
- Created a locator factory function that accepts a `Page` object and returns a `Record<string, Locator>` map.
- Used Playwright locator strategies — `getByRole()`, `getByText()`, `locator('#id')`, `locator('.class')` — to locate elements such as the header image, navigation cards, and form inputs.
- Keeping locators in a dedicated file means if the UI changes, only this file needs updating — not every page or test.

```typescript
export const demohomepage = (page: Page): Record<string, Locator> => ({
  header: page.getByRole('img', { name: 'Toolsqa' }),
  elementsCard: page.getByText('Elements'),
});
```

### 3. Page Object class (`src/pages/LoginPage.ts`)
- Created a `LoginPage` class that receives a `Page` object in its constructor.
- Implemented a `navigatedemoQAhomePage(url: string)` method that calls `page.goto(url)` with `waitUntil: 'networkidle'` to ensure the page is fully loaded before interacting.
- Implemented a `validatehomePageHeader()` assertion method using `expect(this.page).toHaveTitle(/demoqa/i)` to verify the page title.
- Implemented a `screenshot()` helper to capture the current page state and save it to the `Screenshot/` folder.
- All waits are handled by Playwright's built-in auto-waiting — no explicit `sleep()` calls needed.

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async navigatedemoQAhomePage(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async validatehomePageHeader(): Promise<void> {
    await expect(this.page).toHaveTitle(/demoqa/i);
  }
}
```

### 4. Actions class (`src/actions/LoginActions.ts`)
- Created a `LoginActions` class that imports `LoginPage` and composes the full login/navigation workflow in a single `login(url)` method.
- This layer separates **what the test does** (business flow) from **how the page works** (page object interactions).
- The action class calls page object methods in sequence: navigate → validate header → take screenshot.

```typescript
export class LoginActions {
  constructor(private page: Page) {}

  async login(url: string) {
    const homePage = new LoginPage(this.page);
    await homePage.navigatedemoQAhomePage(url);
    await homePage.validatehomePageHeader();
    await this.page.screenshot({ path: 'Screenshot/DemoQA Page.png' });
  }
}
```

### 5. Excel test data (`src/test_data/`)
- `data.xlsx` — Holds test data in rows. Each sheet corresponds to a test module. A `RunFlag` column (`Y`/`N`) controls which rows are active.
- `testdata.ts` — Defines a TypeScript interface that mirrors the Excel columns, giving type safety when reading data in tests.
- `src/utils/excelreader.ts` — A utility class using `ExcelJS` to open `data.xlsx`, read the specified sheet, filter rows where `RunFlag = 'Y'`, and return typed data objects ready for use in tests.

```typescript
// testdata.ts — interface matching Excel columns
export interface LoginTestData {
  RunFlag: string;
  TestCase: string;
  URL: string;
  ExpectedTitle: string;
}
```

```typescript
// excelreader.ts — reads and filters active rows
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile('src/test_data/data.xlsx');
// returns rows where RunFlag = 'Y'
```

### 6. Test spec (`tests/login.spec.ts`)
- Used `@playwright/test`'s `test` and `expect` directly (or via custom fixtures).
- Each test is wrapped in `test.step()` blocks to make Playwright's HTML report and Allure report display clear, readable step-by-step breakdowns.
- Tests tagged with `@smoke` run on every push; `@regression` tests run on the daily scheduled pipeline.
- Excel data is loaded at the start of data-driven tests — the spec iterates over active rows and runs each scenario as a named step.

```typescript
test('@smoke Validate DemoQA homepage loads correctly', async ({ page }) => {
  const actions = new LoginActions(page);

  await test.step('Navigate to DemoQA and validate header', async () => {
    await actions.login('https://demoqa.com');
  });
});
```

### 7. Playwright configuration (`playwright.config.ts`)
- `baseURL` is read from `.env.qa` or `.env.staging` via `dotenv`, so switching environments requires only an `ENV=staging` prefix.
- `reporter` is set to `['html', { open: 'always' }]` so the report opens automatically after every local run.
- `screenshot: 'only-on-failure'` and `video: 'retain-on-failure'` capture evidence only when a test fails, keeping the `test-results/` folder clean.
- `retries: 2` is set for CI runs to handle transient network flakiness on DemoQA.

### 8. CI/CD pipeline (`.github/workflows/playwright.yml`)
- Triggers on push to `main`/`develop`, pull requests, and a daily schedule at 2 AM UTC.
- Installs Node.js 20, runs `npm ci`, installs Playwright browsers, then executes `npm run test:smoke`.
- Uploads `allure-results/` and `playwright-report/` as GitHub Actions artifacts retained for 30 days.
- On merge to `main`, the Allure report is published to **GitHub Pages** automatically.

---

## How the code works together

```
login.spec.ts
    │
    ▼
LoginActions.ts         ← orchestrates the full flow
    │
    ▼
LoginPage.ts            ← page interactions and assertions
    │
    ├── locators/login.ts      ← element selectors (Playwright Locators)
    └── utils/excelreader.ts   ← reads test data from data.xlsx
```

- **Locators** are isolated in `src/locators/` — if DemoQA changes a selector, only one file changes.
- **Page Objects** (`src/pages/`) encapsulate all Playwright interactions for a particular page, keeping selectors and actions together and away from test logic.
- **Actions** (`src/actions/`) compose page object calls into meaningful business workflows, so a test reads like plain English.
- **Test specs** (`tests/`) focus purely on the scenario and assertion — they never touch raw `page.locator()` calls directly.
- **ExcelJS** reads `data.xlsx` at runtime. The `RunFlag` column gives non-technical team members control over which rows execute without touching code.
- **Playwright's auto-waiting** ensures every `click()`, `fill()`, and `expect()` call waits for the element to be stable before acting — eliminating the need for manual `waitForTimeout()` calls.
- **Screenshots** are saved to `Screenshot/` on demand and automatically to `test-results/` on failure, giving clear visual evidence for every failed assertion.
