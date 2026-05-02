import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


export class LoginActions {
  constructor(private page: Page) {}

  async login(url: string, username: string, password: string) {
    const loginPage = new LoginPage(this.page);

    await loginPage.navigate(url);
    await loginPage.enterUsername(username);
    console.log("Username entered", username);
    await loginPage.enterPassword(password);
    console.log("Password entered", password);
    await loginPage.selectCheckbox();
    console.log("Checkbox selected");
    await loginPage.clickSignIn();
    console.log("Sign in button clicked");
  }
}