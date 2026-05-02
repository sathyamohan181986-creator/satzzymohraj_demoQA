import { expect, Page } from '@playwright/test';
import { demohomepage } from '../locators/DemoQA';

export class LoginPage {constructor(private page: Page) {}

//Navigate to DemoQA URL
  async navigatedemoQAhomePage(url: string) {
    await this.page.goto(url);
  }

//Validate the DemoQA home page and the title
  async validatehomePageHeader(): Promise<void> {
    const logo = this.page.locator('img[src*="Toolsqa"]');
    await expect(logo).toBeVisible();
  }
}