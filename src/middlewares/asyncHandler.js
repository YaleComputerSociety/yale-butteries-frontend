"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map