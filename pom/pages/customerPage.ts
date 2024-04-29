import { Locator, Page } from '@playwright/test';

export class CustomerPage {
	readonly page: Page;
	readonly userId: Locator;
	readonly password: Locator;
	readonly signUpBtn: Locator;
	readonly successMessage: Locator;
	readonly userExistsErrorMessage: Locator;
	readonly continueShoppingBtn: Locator;

	constructor(page: Page) {
		this.page = page;

		// elements
		this.userId = page.locator('//input[@name="username"]');
		this.password = page.locator('//input[@name="password"]');
		this.signUpBtn = page.getByText('Sign up');
		this.successMessage = page.locator('.successMessage');
		this.userExistsErrorMessage = page.getByText('Username already exists');
		this.continueShoppingBtn = page.getByText('Continue Shopping');
	}

	async create(username: string, password: string): Promise<void> {
		await this.userId.fill(username);
		await this.password.fill(password);
		await this.signUpBtn.click();
	}
}
