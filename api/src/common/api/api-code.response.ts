export enum ApiCodeResponse {
  TEST = 'api.result.test',
  PAYLOAD_PARAM_IS_MISSING = 'api.error.payload-param-is-missing',
  COMMON_SUCCESS = 'api.success.common',
  COMMON_ERROR = 'api.error.common',
  ME_SUCCESS = 'api.success.me',

  SIGN_IN_SUCCESS = 'api.success.signin',
  SIGN_IN_ERROR = 'api.error.signin',
  SIGN_IN_PAYLOAD_USERNAME_MISSING = 'api.error.signin-payload-username-missing',
  SIGN_IN_PAYLOAD_USERNAME_LENGTH_ERROR = 'api.error.signin-payload-username-length',
  SIGN_IN_PAYLOAD_PASSWORD_MISSING = 'api.error.signin-payload-password-missing',
  SIGN_IN_PAYLOAD_SOCIAL_LOGIN_MISSING = 'api.error.signin-payload-social-login-missing',

  SIGNUP_ERROR = 'api.error.signup',
  SIGNUP_SUCCESS = 'api.success.signup',
  SIGNUP_PAYLOAD_USERNAME_IS_MISSING = 'api.error.signup-payload-username-is-missing',
  SIGNUP_PAYLOAD_USERNAME_LENGTH_ERROR = 'api.error.signup-payload-username-length',
  SIGNUP_PAYLOAD_PASSWORD_IS_MISSING = 'api.error.signup-payload-password-is-missing',
  SIGNUP_PAYLOAD_PASSWORD_LENGTH_ERROR = 'api.error.signup-payload-.password-length',
  SIGNUP_PAYLOAD_MAIL_IS_MISSING = 'api.error.signup-payload-mail-empty',
  SIGNUP_PAYLOAD_MAIL_INVALID = 'api.error.signup-payload-mail-invalid',

  USER_NOT_FOUND = 'api.error.user-not-found',
  USER_ALREADY_EXIST = 'api.error.user-already-exist',
  TOKEN_GEN_ERROR = 'api.error.token-generator',
  NO_TOKEN_FOUNDED = 'api.error.no-token-founded',
  TOKEN_EXPIRED = 'api.error.token-expired',
  CREDENTIAL_DELETE_ERROR = 'api.error.account-delete',
  CREDENTIAL_DELETE_SUCCESS = 'api.success.account-delete',
  PAYLOAD_IS_NOT_VALID = 'api.error.payload-is-not-valid',


  STOCK_ID_LENGTH_ERROR = 'api.error.stock-payload-id-length',
  STOCK_ID_MISSING_ERROR = 'api.error.stock-payload-id-missing',
  STOCK_TITLE_LENGTH_ERROR = 'api.error.stock-payload-title-length',
  STOCK_TITLE_MISSING_ERROR = 'api.error.stock-payload-title-missing',
  STOCK_LOCATION_IS_EMPTY = 'api.error.stock-payload-location-missing',
  STOCK_SECTION_IS_EMPTY = 'api.error.stock-payload-section-missing',

  LESSON_ID_LENGTH_ERROR = 'api.error.lesson-payload-id-length',
  LESSON_ID_MISSING_ERROR = 'api.error.lesson-payload-id-missing',
  LESSON_TITLE_LENGTH_ERROR = 'api.error.lesson-payload-title-length',
  LESSON_TITLE_MISSING_ERROR = 'api.error.lesson-payload-title-missing',
  LESSON_STOCK_LENGTH_ERROR = 'api.error.lesson-payload-stock-length',
  LESSON_STOCK_MISSING_ERROR = 'api.error.lesson-payload-stock-missing',

  STOCK_NOT_FOUND = 'api.error.stock-not-found-delete',
  STOCK_DELETE_ERROR = 'api.error.stock-delete',
  STOCK_LIST_ERROR = 'api.error.stock-list',
  STOCK_CREATE_ERROR = 'api.error.stock-create',
  STOCK_UPDATE_ERROR = 'api.error.stock-update',

  LESSON_NOT_FOUND = 'api.error.lesson-not-found-delete',
  LESSON_DELETE_ERROR = 'api.error.lesson-delete',
  LESSON_LIST_ERROR = 'api.error.lesson-list',
  LESSON_CREATE_ERROR = 'api.error.lesson-create',
  LESSON_UPDATE_ERROR = 'api.error.lesson-update',
  CONSUMPTION_IS_MISSING = 'api.error-consumption-payload-stock-is-missing',


  PRODUCT_ID_MISSING_ERROR = 'api.error.product-payload-id-mission',
  PRODUCT_TITLE_MISSING_ERROR = 'api.error.product-payload-title-mission',
  PRODUCT_HEIGHT_MISSING_ERROR = 'api.error.product-payload-height-mission',
  PRODUCT_WIDTH_MISSING_ERROR = 'api.error.product-payload-width-mission',
  PRODUCT_THICKNESS_MISSING_ERROR = 'api.error.product-payload-thickness-mission',
  PRODUCT_TYPE_MISSING_ERROR = 'api.error.product-payload-type-mission',

  PRODUCT_NOT_FOUND = 'api.error.product-not-found-delete',
  PRODUCT_DELETE_ERROR = 'api.error.product-delete',
  PRODUCT_LIST_ERROR = 'api.error.product-list',
  PRODUCT_CREATE_ERROR = 'api.error.product-create',
  PRODUCT_UPDATE_ERROR = 'api.error.product-update',




  CONSUMPTION_NOT_FOUND = 'api.error.consumption-not-found-delete',
  CONSUMPTION_DELETE_ERROR = 'api.error.consumption-delete',
  CONSUMPTION_LIST_ERROR = 'api.error.consumption-list',
  CONSUMPTION_CREATE_ERROR = 'api.error.consumption-create',
  CONSUMPTION_UPDATE_ERROR = 'api.error.consumption-update',

}