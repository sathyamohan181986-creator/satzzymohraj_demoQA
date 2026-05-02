import { expect, Page } from '@playwright/test';
import { demohomepage, elementslocator } from '../locators/DemoQA';
import { fillElementsPage } from '@test-data/testdata';


export class ElementsPage {constructor(private page: Page) {}

//Navigate to DemoQA URL
  async navigatedemoQAhomePage(url: string) {
    await this.page.goto(url);
  }

//Validate the Elements page
  async clickElementsCard(fields: any) {
    const elementscard = demohomepage(this.page);
    await elementscard.elements.waitFor({ state: 'visible', timeout: 15_000 });
    await elementscard.elements.click();
  }

//Validate Text Box Elements page
  async textBoxElts(fullName: string, emailId: string, currAdd: string, permAdd: string) {
    const elementsloc = elementslocator(this.page);
    await elementsloc.textBox.click();
    await elementsloc.fullName.fill(fullName);
    await elementsloc.email.fill(emailId);
    await elementsloc.curradd.fill(currAdd);
    await elementsloc.permadd.fill(permAdd);
    await elementsloc.submitbtn.click();
  }
}