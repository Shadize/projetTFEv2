"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonUpdateException = exports.LessonCreateException = exports.LessonListException = exports.LessonDeleteException = exports.LessonNotFoundException = void 0;
const api_1 = require("../../../common/api");
class LessonNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.LESSON_NOT_FOUND, 200);
    }
}
exports.LessonNotFoundException = LessonNotFoundException;
class LessonDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.LESSON_DELETE_ERROR, 200);
    }
}
exports.LessonDeleteException = LessonDeleteException;
class LessonListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.LESSON_LIST_ERROR, 200);
    }
}
exports.LessonListException = LessonListException;
class LessonCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.LESSON_CREATE_ERROR, 200);
    }
}
exports.LessonCreateException = LessonCreateException;
class LessonUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.LESSON_UPDATE_ERROR, 200);
    }
}
exports.LessonUpdateException = LessonUpdateException;
//# sourceMappingURL=lesson.exception.js.map