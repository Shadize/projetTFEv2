"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursusUpdateException = exports.CursusCreateException = exports.CursusListException = exports.CursusDeleteException = exports.CursusNotFoundException = void 0;
const api_1 = require("../../../common/api");
class CursusNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CURSUS_NOT_FOUND, 200);
    }
}
exports.CursusNotFoundException = CursusNotFoundException;
class CursusDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CURSUS_DELETE_ERROR, 200);
    }
}
exports.CursusDeleteException = CursusDeleteException;
class CursusListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CURSUS_LIST_ERROR, 200);
    }
}
exports.CursusListException = CursusListException;
class CursusCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CURSUS_CREATE_ERROR, 200);
    }
}
exports.CursusCreateException = CursusCreateException;
class CursusUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CURSUS_UPDATE_ERROR, 200);
    }
}
exports.CursusUpdateException = CursusUpdateException;
//# sourceMappingURL=cursus.exception.js.map