"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker");
exports.generateUser = () => {
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
exports.generateUsers = numUsers => Array.from({ length: numUsers }, exports.generateUser);
//# sourceMappingURL=helper.js.map