import {expect, Locator, Page, test} from '@playwright/test';
import { console } from 'node:inspector';

export const demohomepage = (page: Page): Record<string, Locator> => ({
    header: page.getByRole('img', { name: 'Toolsqa' }),
    //header: page.getByText('/assets/Toolsqa-DZdwt2ul.jpg')
}
    
)