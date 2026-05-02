import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { demohomepage } from 'src/locators/login';
import path from 'node:path';


export class LoginActions {
  constructor(private page: Page) {}

  async login(url: string) {
    const homePage = new LoginPage(this.page);
    
    await homePage.navigatedemoQAhomePage(url);
    //await this.page.pause();
    await homePage.validatehomePageHeader();
    await this.page.screenshot({ path: "Screenshot/DemoQA Page.png" });
  }
}