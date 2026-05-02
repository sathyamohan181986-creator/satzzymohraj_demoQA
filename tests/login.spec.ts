import { test } from '@playwright/test';
import { LoginActions } from '../src/actions/LoginActions';
import { readExcelData } from '../src/utils/excelreader';
import { LoginPage } from '../src/pages/LoginPage';
import { url } from 'inspector';

const testdata: any = readExcelData();
//const baseData = testdata[0];

test.describe('Access to DemoQA site', ()=> {
  test('Login Test', async ({ page, context }) => {
    const loginCheck = new LoginActions(page);
    const loginURL = testdata[0].pURL;
    await loginCheck.login(loginURL);
})
})