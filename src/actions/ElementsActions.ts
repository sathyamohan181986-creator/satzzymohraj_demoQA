import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { demohomepage } from 'src/locators/DemoQA';
import path from 'node:path';


export class ElementsActions {
  constructor(private page: Page) {}

  //Login Actions
  async login(url: string) {
    const homePage = new LoginPage(this.page);    
    await homePage.navigatedemoQAhomePage(url);
    }

  //ElementsActions
  async elements(fields: any) {
    const eltspage = new ElementsPage(this.page);
    await eltspage.clickElements(fields);
    await this.page.screenshot({ path: 'Screenshot/Elements Page.png', fullPage: true });
    }
}