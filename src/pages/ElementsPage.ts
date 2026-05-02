import { expect, Page } from '@playwright/test';
import { demohomepage } from '../locators/DemoQA';


export class ElementsPage {constructor(private page: Page) {}

//Navigate to DemoQA URL
  async navigatedemoQAhomePage(url: string) {
    await this.page.goto(url);
  }

//Validate the Elements page
  async clickElements(fields: any) {
    const elementsloc = demohomepage(this.page);
    await elementsloc.elements.waitFor({ state: 'visible', timeout: 15_000 });
    await elementsloc.elements.click();

  }

}