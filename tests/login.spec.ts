import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { readExcelData } from '../src/utils/excelreader';
import { url } from 'inspector';

const testdata: any = readExcelData();
//const baseData = testdata[0];

test.describe('Access to DemoQA site', ()=> {
  test('Login Test', async ({ page, context }) => {
    const loginCheck = new LoginPage(page);
    const loginURL = testdata[0].pURL;
    await loginCheck.navigatedemoQAhomePage(loginURL);
})
})