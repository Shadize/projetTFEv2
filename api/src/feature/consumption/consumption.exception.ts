import { ApiCodeResponse, ApiException } from '@common/api';

export class ConsumptionNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CONSUMPTION_NOT_FOUND, 200);
  }
}

export class ConsumptionDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CONSUMPTION_DELETE_ERROR, 200);
  }
}

export class ConsumptionListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CONSUMPTION_LIST_ERROR, 200);
  }
}

export class ConsumptionCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CONSUMPTION_CREATE_ERROR, 200);
  }
}

export class ConsumptionListByShelveException extends ApiException {
  constructor() {
    super(ApiCodeResponse.CONSUMPTION_LIST_BY_SHELVE_ERROR, 200);
  }
}

