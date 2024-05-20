import {ApiCodeResponse, ApiException} from '@common/api';

export class CursusNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CURSUS_NOT_FOUND, 200);
  }
}

export class CursusDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CURSUS_DELETE_ERROR, 200);
  }
}

export class CursusListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CURSUS_LIST_ERROR, 200);
  }
}

export class CursusCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CURSUS_CREATE_ERROR, 200);
  }
}

export class CursusUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CURSUS_UPDATE_ERROR, 200);
  }
}