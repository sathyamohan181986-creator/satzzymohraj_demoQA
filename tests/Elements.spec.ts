import { test } from '@playwright/test';
import { LoginActions } from '../src/actions/LoginActions';
import { ElementsActions } from 'src/actions/ElementsActions';
import { readExcelData } from '../src/utils/excelreader';
import { fillElementsPage } from '@test-data/testdata';
import { LoginPage } from '../src/pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { url } from 'inspector';

const testdata: any = readExcelData();
const data = fillElementsPage;
const loginURL = testdata[0].pURL;
//const baseData = testdata[0];

test.describe('Elements Page Validation', ()=> {
  test('Navigate to Elements page', async ({ page, context }) => {
    const loginCheck = new LoginActions(page);
    await loginCheck.login(loginURL);
    const eltsVal = new ElementsActions(page);
    await eltsVal.elements(page);
})

  test('Text Box Elements Page Validation', async ({ page }) => {
    const loginelts = new LoginActions(page);
    await loginelts.login(loginURL);
    const textboxeltsVal = new ElementsActions(page);
    await textboxeltsVal.elements(page);
    await textboxeltsVal.textBoxelts(
      data.textBoxElements.fullName,
      data.textBoxElements.emailId,
      data.textBoxElements.currAdd,
      data.textBoxElements.permAdd
    );
    });
})