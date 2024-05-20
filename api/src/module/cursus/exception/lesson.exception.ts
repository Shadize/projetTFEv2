import {ApiCodeResponse, ApiException} from '@common/api';

export class LessonNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.LESSON_NOT_FOUND, 200);
  }
}

export class LessonDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.LESSON_DELETE_ERROR, 200);
  }
}

export class LessonListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.LESSON_LIST_ERROR, 200);
  }
}

export class LessonCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.LESSON_CREATE_ERROR, 200);
  }
}

export class LessonUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.LESSON_UPDATE_ERROR, 200);
  }
}