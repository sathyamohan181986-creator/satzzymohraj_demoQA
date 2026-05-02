import { test } from '@playwright/test';
import { LoginActions } from '../src/actions/LoginActions';
import { readExcelData } from '../src/utils/excelreader';
import { LoginPage } from '../src/pages/LoginPage';

const testdata: any = readExcelData();
//const baseData = testdata[0];

test.describe('Rahul Shetty Academy', ()=> {
  test('Login Test', async ({ page, context }) => {
    const loginCheck = new LoginActions(page);
    const loginUrl = testdata[0].pURL;
    const Uname = testdata[0].pUserName;
    const Pwd = testdata[0].pPassword;
    await loginCheck.login(loginUrl, Uname, Pwd);
})
})