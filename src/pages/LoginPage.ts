import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/login';

export class LoginPage {
  constructor(private page: Page) {}


  async navigate(url: string) {
    await this.page.goto(url);
  }

  async enterUsername(username: string) {
    await this.page.locator(LoginLocators.username).fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator(LoginLocators.password).fill(password);
  }

  async selectCheckbox() {
    await this.page.locator(LoginLocators.checkbox).click();
  }

  async clickSignIn() {
    await this.page.locator(LoginLocators.signInBtn).click();
  }
}