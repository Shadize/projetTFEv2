import { ApiCodeResponse, ApiException } from '@common/api';

export class ProductNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.PRODUCT_NOT_FOUND, 200);
  }
}

export class ProductDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.PRODUCT_DELETE_ERROR, 200);
  }
}

export class ProductListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.PRODUCT_LIST_ERROR, 200);
  }
}

export class ProductCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.PRODUCT_CREATE_ERROR, 200);
  }
}

export class ProductUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.PRODUCT_UPDATE_ERROR, 200);
  }
}