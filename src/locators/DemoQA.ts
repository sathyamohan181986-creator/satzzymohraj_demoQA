import {expect, Locator, Page, test} from '@playwright/test';
import { console } from 'node:inspector';


//DemoQA Home page locators
export const demohomepage = (page: Page): Record<string, Locator> => ({
    header:         page.getByRole('img', { name: 'Toolsqa' }),
    elements:       page.getByText('Elements'),
    textBox:        page.getByText('Text Box'),
    forms:          page.getByText('Forms'),
    alframwin:      page.getByText('Alerts, Frame & Windows'),
    widgets:        page.getByText('Widgets'),
    interactions:   page.getByText('Interactions'),
    bookstoreapp:   page.getByText('Book Store Application')
})

export const elementslocator = (page: Page): Record<string, Locator> => ({
    
    //textBoxHeader:  page.getBy
    fullName:       page.getByPlaceholder('Full Name', { exact: true }),
    email:          page.getByPlaceholder('name@example.com', { exact: true }),
    curradd:        page.getByPlaceholder('Current Address', { exact: true }),
    permadd:        page.locator('//*[@id="permanentAddress"]'),
    submitbtn:      page.getByText('Submit'),
    output:         page.locator('//*[@id="output"]'),
    Name_OUTPUT:    page.locator('//p[@id="name"]'),
    email_OUTPUT:   page.locator('//p[@id="email"]'),
    curradd_OUTPUT: page.locator('//p[@id="currentAddress"]'),
    permadd_OUTPUT: page.locator('//p[@id="permanentAddress"]')
})

//