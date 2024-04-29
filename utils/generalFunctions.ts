import { APIResponse } from '@playwright/test';
import { Customer } from './types';

export const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

export const currentTimestamp: () => number = () => Date.now();

export async function parseCustomerIdFromResponse(data: APIResponse): Promise<number> {
	const customerData = await data.json();
	return customerData.customerId;
}

export async function parseCustomerUsernameFromResponse(data: APIResponse): Promise<string> {
	const customerData = await data.json();
	return customerData.username;
}

export async function parseCustomerFromResponse(data: APIResponse): Promise<Customer> {
	return (await data.json()) as Customer;
}
