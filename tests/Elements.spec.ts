import { expect, Page, test } from '@playwright/test'
import { readExcelData } from '@utils/excelreader';
import { fillElementsPage } from '@test-data/testdata';
import { LoginPage } from '../src/pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { url } from 'inspector';

const testdata: any = readExcelData();
const data = fillElementsPage;
const loginURL = testdata[0].pURL;
//const baseData = testdata[0];

test.describe('Access to DemoQA site', ()=> {
  test('Login Test', async ({ page, context }) => {
    const loginCheck = new LoginPage(page);
    const loginURL = testdata[0].pURL;
    await loginCheck.navigatedemoQAhomePage(loginURL);
})

  test('Text Box Elements Page Validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigatedemoQAhomePage(loginURL);

    const TEXT_BOX = new ElementsPage(page);
    await TEXT_BOX.clickElementsCard(page);
    await TEXT_BOX.textBoxElts(
      data.textBoxElements.fullName,
      data.textBoxElements.emailId,
      data.textBoxElements.currAdd,
      data.textBoxElements.permAdd
    );
      const TEXT_BOX_OUTPUT = new ElementsPage(page);
      await TEXT_BOX_OUTPUT.assertOutputvalues(
      data.textBoxElements.fullName,
      data.textBoxElements.emailId,
      data.textBoxElements.currAdd,
      data.textBoxElements.permAdd
    );
  })
})