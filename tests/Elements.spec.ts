import { test } from '@playwright/test';
import { LoginActions } from '../src/actions/LoginActions';
import { ElementsActions } from 'src/actions/ElementsActions';
import { readExcelData } from '../src/utils/excelreader';
import { LoginPage } from '../src/pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { url } from 'inspector';

const testdata: any = readExcelData();
//const baseData = testdata[0];

test.describe('Elements Page Validation', ()=> {
  test('Navigate to Elements page', async ({ page, context }) => {
    const loginCheck = new LoginActions(page);
    const loginURL = testdata[0].pURL;
    await loginCheck.login(loginURL);
    const eltsVal = new ElementsActions(page);
    await eltsVal.elements(page);
})

 // test('Elements Page Validation', async ({ page }) => {

  //})
})