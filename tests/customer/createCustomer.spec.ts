import { expect, test } from '../../fixtures/fixtureBuilder';
import { buildFakeCustomer } from '../../testData/fakeData';
import { Customer } from '../../utils/types';
import messages from '../../utils/messages';
import { CustomerPage } from '../../pom/pages/customerPage';

test.describe('Create customer', () => {
	test('it should create a new customer successfully', async ({ landingPage }) => {
		const customerData: Customer = buildFakeCustomer();

		await landingPage.navigateTo();
		const newCustomerPage: CustomerPage = await landingPage.goToUserCreationPage();
		await newCustomerPage.create(customerData.username, customerData.password as string);

		await expect(newCustomerPage.continueShoppingBtn).toBeVisible();
		await expect(newCustomerPage.successMessage).toHaveText(messages.customer.create.success);
	});

	test('it should return an error when username is already in use', async ({ landingPage, createCustomerAndGetData }) => {
		const customer: Customer = await createCustomerAndGetData;

		await landingPage.navigateTo();
		const newCustomerPage: CustomerPage = await landingPage.goToUserCreationPage();
		await newCustomerPage.create(customer.username, customer.password as string);

		await expect(newCustomerPage.continueShoppingBtn).not.toBeVisible();
		await expect(newCustomerPage.userExistsErrorMessage).toBeVisible();
	});
});
