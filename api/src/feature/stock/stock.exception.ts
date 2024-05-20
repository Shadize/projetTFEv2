import { ApiCodeResponse, ApiException } from '@common/api';

export class StockNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.STOCK_NOT_FOUND, 200);
  }
}

export class StockDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.STOCK_DELETE_ERROR, 200);
  }
}

export class StockListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.STOCK_LIST_ERROR, 200);
  }
}

export class StockCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.STOCK_CREATE_ERROR, 200);
  }
}

export class StockUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.STOCK_UPDATE_ERROR, 200);
  }
}