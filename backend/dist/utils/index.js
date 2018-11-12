"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Multer = require("multer");
exports.multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
exports.successRes = (res, response) => res.json({ status: 200, response });
exports.errorRes = (res, status, error) => res.status(status).json({
    status,
    error
});
exports.memberMatches = (user, id) => user &&
    (user._id === id ||
        (typeof user._id.equals === 'function' && user._id.equals(id)));
exports.escapeRegEx = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
const dateToString = date => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short'
});
exports.formatDate = date => {
    if (!date)
        return 'Current';
    const str = dateToString(date);
    return str !== 'Invalid Date' ? str : 'Current';
};
function to(promise, errorExt) {
    return promise
        .then((data) => [data, null])
        .catch(err => {
        if (errorExt)
            Object.assign(err, errorExt);
        return [null, err];
    });
}
exports.to = to;
//# sourceMappingURL=index.js.map