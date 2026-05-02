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

  //ClickElementslink
  async elements(fields: any) {
    const eltspage = new ElementsPage(this.page);
    await eltspage.clickElementsCard(fields);
    await this.page.screenshot({ path: 'Screenshot/Elements Page.png', fullPage: true });
    }

  //Text Box Elements Page
  async textBoxelts(fullName:string, emailId:string, currAdd:string, permAdd:string) {
    const textboxelts = new ElementsPage(this.page);
    await textboxelts.textBoxElts(fullName, emailId, currAdd, permAdd);
    await this.page.screenshot({ path: 'Screenshot/TextBoxPage.png', fullPage: true });
  }
}