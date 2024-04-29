import { APIRequestContext, APIResponse, request, expect, test as base } from '@playwright/test';
import { CONFIG } from '../variables.config';
import customerRequests from '../requests/customer/customerRequests';
import { parseCustomerFromResponse, parseCustomerIdFromResponse } from '../utils/generalFunctions';
import { buildFakeCustomer } from '../testData/fakeData';
import { Customer } from '../utils/types';
import { LandingPage } from '../pom/pages/landingPage';

// declare the types of your fixtures
interface MyFixtures {
	apiContext: APIRequestContext;
	createCustomer: APIResponse;
	createCustomerAndGetData: Customer;
	landingPage: LandingPage;
}

// extend base test to be used in multiple test files. Each of them will get the fixtures
export const test = base.extend<MyFixtures>({
	// eslint-disable-next-line no-empty-pattern
	async apiContext({}, use) {
		// Set up the fixture
		const apiContext: APIRequestContext = await request.newContext({
			baseURL: CONFIG.baseApiHost,
			extraHTTPHeaders: {
				Accept: 'application/json',
				'Content-type': 'application/json',
			},
		});

		// Use the fixture value in the test
		await use(apiContext);

		// Clean up the fixture
		await apiContext.dispose();
	},

	// create customer returning its ID, then delete it (teardown)
	createCustomer: async ({ apiContext }, use) => {
		// Set up the fixture
		const customerData: Customer = buildFakeCustomer();
		const response: APIResponse = await customerRequests.createCustomer(apiContext, customerData);
		expect(response.ok()).toBeTruthy();
		const customerId: number = await parseCustomerIdFromResponse(response);

		// Use the fixture value in the test
		await use(response);

		// Clean up the fixture
		const deleteResponse: APIResponse = await customerRequests.deleteCustomer(apiContext, customerId);
		expect(deleteResponse.ok()).toBeTruthy();
	},

	// create customer returning its data, then delete it (teardown)
	createCustomerAndGetData: async ({ apiContext }, use) => {
		// Set up the fixture
		const fakeCustomer: Customer = buildFakeCustomer();
		const createResponse: APIResponse = await customerRequests.createCustomer(apiContext, fakeCustomer);
		expect(createResponse.ok()).toBeTruthy();
		const customerId: number = await parseCustomerIdFromResponse(createResponse);
		const searchResponse: APIResponse = await customerRequests.searchCustomerById(apiContext, customerId);
		const customerData: Customer = await parseCustomerFromResponse(searchResponse);
		customerData.password = fakeCustomer.password;

		// Use the fixture value in the test
		await use(customerData);

		// Clean up the fixture
		const deleteResponse: APIResponse = await customerRequests.deleteCustomer(apiContext, customerId);
		expect(deleteResponse.ok()).toBeTruthy();
	},

	landingPage: async ({ page }, use) => {
		const landingPage = new LandingPage(page);
		await use(landingPage);
	},
});

export { expect } from '@playwright/test';
