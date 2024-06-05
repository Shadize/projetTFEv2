"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockUpdateException = exports.StockCreateException = exports.StockListException = exports.StockDeleteException = exports.StockNotFoundException = void 0;
const api_1 = require("../../common/api");
class StockNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.STOCK_NOT_FOUND, 200);
    }
}
exports.StockNotFoundException = StockNotFoundException;
class StockDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.STOCK_DELETE_ERROR, 200);
    }
}
exports.StockDeleteException = StockDeleteException;
class StockListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.STOCK_LIST_ERROR, 200);
    }
}
exports.StockListException = StockListException;
class StockCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.STOCK_CREATE_ERROR, 200);
    }
}
exports.StockCreateException = StockCreateException;
class StockUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.STOCK_UPDATE_ERROR, 200);
    }
}
exports.StockUpdateException = StockUpdateException;
//# sourceMappingURL=stock.exception.js.map