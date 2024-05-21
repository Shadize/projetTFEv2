"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateException = exports.ProductCreateException = exports.ProductListException = exports.ProductDeleteException = exports.ProductNotFoundException = void 0;
const api_1 = require("../../common/api");
class ProductNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.PRODUCT_NOT_FOUND, 200);
    }
}
exports.ProductNotFoundException = ProductNotFoundException;
class ProductDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.PRODUCT_DELETE_ERROR, 200);
    }
}
exports.ProductDeleteException = ProductDeleteException;
class ProductListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.PRODUCT_LIST_ERROR, 200);
    }
}
exports.ProductListException = ProductListException;
class ProductCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.PRODUCT_CREATE_ERROR, 200);
    }
}
exports.ProductCreateException = ProductCreateException;
class ProductUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.PRODUCT_UPDATE_ERROR, 200);
    }
}
exports.ProductUpdateException = ProductUpdateException;
//# sourceMappingURL=product.exception.js.map