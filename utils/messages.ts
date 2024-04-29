export default {
	customer: {
		create: {
			alreadyExists: /^A customer with username (\w+) already exists.$/,
			success: /^Congratulations! Your account has been created!$/,
		},
		delete: {
			notFound: /^Unable to delete. Customer with id (\w+) not found.$/,
		},
	},
};
