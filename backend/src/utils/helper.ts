import * as faker from 'faker';

export const generateUser = () => {
	const first = faker.name.firstName();
	const last = faker.name.lastName();
	const email = faker.internet.email(first, last);
	const password = faker.internet.password(8);
	const phone = faker.phone.phoneNumber();
	return {
		name: `${first} ${last}`,
		email,
		password,
		passwordConfirm: password,
		phone
	};
};

export const generateUsers = numUsers =>
	Array.from({ length: numUsers }, generateUser);
