
# satzzymohraj_demoQA
Playwright/TypeScript Automation on DEMOQA Website
=======
>>>>>>> 501a2a5 (Resolved README conflict)
# Playwright Hybrid “Lite” (Drop-in)

A **minimal, resilient** keyword-data-driven runner for Playwright, designed to avoid ESM/xlsx pitfalls by converting Excel → JSON **before** tests.

## Why this is stable


Excel → JSON happens in a **Node CommonJS helper** (`tools/xlsx_to_json.cjs`) using `XLSX.readFile(...)` (official Node usage).No ESM quirks.
=======
Excel → JSON happens in a **Node CommonJS helper** (`tools/xlsx_to_json.cjs`) using `XLSX.readFile(...)` (official Node usage). No ESM quirks.
>>>>>>> 501a2a5 (Resolved README conflict)

Playwright runs TypeScript tests **out of the box** — no build step required.

Screenshots are attached **after every keyword** using testInfo.attach(...) + page.screenshot() so they appear in the HTML report.

## Put files here
```
./data/TestScript.xlsx      # sheet: Test_Script
./data/Data.xlsx            # sheets: Data ...
```

## Run
```bash
    npm i
    npx playwright install
    npm test
    npx playwright show-report
```
## How it works

1) `global.setup.ts` calls the converter once -> `runtime/testscript.json` + `runtime/data.json`
2) `tests/runner.spec.ts` execute keywords read from Json.
3) Keyword classes mirror your Java class names; keep **method names the same**.
4) Fill `src/repo/objects.ts` with selectors and use `this.loc('key')`.

## //syntax of the test cases in playwright

//test('First Playwright Testcase', async ()=> //function() when the function does not have name then we can use the syntax like this which will make the code simple
// first arguement is test case name and second arguemnt name is function. Actual code is in second argument
//{
//Step1 - Open the browser
//use await makes the step 2 waits until the step 1 is successful. When we use await then we have to make this as a async function.
//Step2 - navigate
//Step3 - CLick
//});

//fixture is used to reuse test configurations and here we have fixture call browser async (browser)==>browser is a fixtures comes 
// by default in playwright module and available globally to each and every test of the project.
//this global fixtures are common for every annotations.
//Whenever we are creating a test annotation there are some fixed set of fixtures which will be available automatically. 
//This test belongs to playwright package so obviously this test also know there is something called browser and we no need to 
// really declare anything on the top.
//To use the browser inside the function, need to send the browser as a parameter to the test function first and that will 
// passed on to inside the body (braces)
//To represent and let this fucntion know that this specifically playwright feature, u have to wrap that in curly braces.
//test('First Playwright Testcase', async ({browser})=> )if you don't give this as a curly braces then this is evaluated as a 
// normal browser string value.
//For playwright fixture it should be in a curly braces.

//test('First Playwright test case', async ({browser})=>//to represent and let this function know that this is specifically playwright 
// fixture we have to wrap that in curly braces. It is evaluated as a playwright fixture, if no curly braces then it s normal 
// browser string value.
//{
//create new context. one instance
//    chrome - plugin/cookies //information when you open a browser. Because in context all these are present.
  //  const context = await browser.newContext();//store the variable const is a keyword and context is a variable
    //const page = await context.newPage();
    //await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//});
//If Id is present css-> tagname#id (or) #id
//If class attribute is present css-> tagname.class (or) .class
//Write css based on any Attribute  css-> parenttagname >> childtagname
//If needs to write the locator based on text

//Sample test script:
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


##
