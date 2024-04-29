import { Locator, Page } from '@playwright/test';
import { CustomerPage } from './customerPage';

export class LandingPage {
	readonly page: Page;
	readonly link: string;
	readonly createUserBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		this.link = '/index.html';

		// elements
		this.createUserBtn = page.getByRole('button', { name: 'Create User' });
	}

	async navigateTo(): Promise<void> {
		await this.page.goto(this.link);
	}

	async goToUserCreationPage(): Promise<CustomerPage> {
		await this.createUserBtn.click();
		return new CustomerPage(this.page);
	}
}
