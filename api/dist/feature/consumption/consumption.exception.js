"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionCreateException = exports.ConsumptionListException = exports.ConsumptionDeleteException = exports.ConsumptionNotFoundException = void 0;
const api_1 = require("../../common/api");
class ConsumptionNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONSUMPTION_NOT_FOUND, 200);
    }
}
exports.ConsumptionNotFoundException = ConsumptionNotFoundException;
class ConsumptionDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONSUMPTION_DELETE_ERROR, 200);
    }
}
exports.ConsumptionDeleteException = ConsumptionDeleteException;
class ConsumptionListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONSUMPTION_LIST_ERROR, 200);
    }
}
exports.ConsumptionListException = ConsumptionListException;
class ConsumptionCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONSUMPTION_CREATE_ERROR, 200);
    }
}
exports.ConsumptionCreateException = ConsumptionCreateException;
//# sourceMappingURL=consumption.exception.js.map