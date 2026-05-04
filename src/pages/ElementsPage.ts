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
    await elementscard.elements.waitFor({ state: 'visible', timeout: 15000 });
    await elementscard.elements.click();
    await elementscard.textBox.click();
  }

//Fill the value in Text Box Elements page
  async textBoxElts(fullName: string, emailId: string, currAdd: string, permAdd: string) {
    const elementsloc = elementslocator(this.page);
    await elementsloc.fullName.fill(fullName);
    await elementsloc.email.fill(emailId);
    await elementsloc.curradd.fill(currAdd);
    await elementsloc.permadd.fill(permAdd);
    await elementsloc.submitbtn.click();
  }

//Assert the values of the Text Box Elements page
  async assertOutputvalues(fullName: string, emailId: string, currAdd: string, permAdd: string): Promise<void> {
    const elementsloc = elementslocator(this.page);
    const OUTPUT = await expect(elementsloc.output).toBeVisible();
    await expect(elementsloc.Name_OUTPUT).toContainText(fullName);
    await expect(elementsloc.email_OUTPUT).toContainText(emailId);
    await expect(elementsloc.curradd_OUTPUT).toContainText(currAdd);
    await expect(elementsloc.permadd_OUTPUT).toContainText(permAdd);
    // ✅ Log the INPUT values to confirm what was asserted
    console.log('✅ Asserted Name    :', fullName);
    console.log('✅ Asserted Email   :', emailId);
    console.log('✅ Asserted CurrAdd :', currAdd);
    console.log('✅ Asserted PermAdd :', permAdd);
  }
}