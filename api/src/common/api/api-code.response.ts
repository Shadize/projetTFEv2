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
  CREDENTIAL_CREATE_ERROR = 'api.error.account-create',
  CREDENTIAL_UPDATE_ERROR = 'api.error.account-update',
  CREDENTIAL_DELETE_ERROR = 'api.error.account-delete',
  CREDENTIAL_LIST_ERROR = 'api.error.account-list',
  CREDENTIAL_DELETE_SUCCESS = 'api.success.account-delete',
  CREDENTIAL_UPDATE_SUCCESS = 'api.success.account-update',
  CREDENTIAL_CREATE_SUCCESS = 'api.success.account-create',


  

  PAYLOAD_IS_NOT_VALID = 'api.error.payload-is-not-valid',


  STOCK_ID_LENGTH_ERROR = 'api.error.stock-payload-id-length',
  STOCK_ID_MISSING_ERROR = 'api.error.stock-payload-id-missing',
  STOCK_TITLE_LENGTH_ERROR = 'api.error.stock-payload-title-length',
  STOCK_TITLE_MISSING_ERROR = 'api.error.stock-payload-title-missing',
  STOCK_LOCATION_IS_EMPTY = 'api.error.stock-payload-location-missing',
  STOCK_TITLE_IS_EMPTY = 'api.error.stock-payload-title-missing',
  STOCK_WIDTH_IS_EMPTY = 'api.error.stock-payload-width-missing',
  STOCK_HEIGHT_IS_EMPTY = 'api.error.stock-payload-height-missing',
  STOCK_SCALE_IS_EMPTY = 'api.error.stock-payload-scale-missing',

  LESSON_ID_LENGTH_ERROR = 'api.error.lesson-payload-id-length',
  LESSON_ID_MISSING_ERROR = 'api.error.lesson-payload-id-missing',
  LESSON_TITLE_LENGTH_ERROR = 'api.error.lesson-payload-title-length',
  LESSON_TITLE_MISSING_ERROR = 'api.error.lesson-payload-title-missing',
  LESSON_STOCK_LENGTH_ERROR = 'api.error.lesson-payload-stock-length',
  LESSON_STOCK_MISSING_ERROR = 'api.error.lesson-payload-stock-missing',

  STOCK_DELETE_SUCCESS = 'api.success.stock-delete',
  STOCK_CREATE_SUCCESS = 'api.success.stock-create',
  STOCK_UPDATE_SUCCESS = 'api.success.stock-update',

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


  PRODUCT_ID_MISSING_ERROR = 'api.error.product-payload-id-missing',
  PRODUCT_TITLE_MISSING_ERROR = 'api.error.product-payload-title-missing',
  PRODUCT_QUANTITY_MISSING_ERROR = 'api.error.product-payload-qunatity-missing',
  PRODUCT_HEIGHT_MISSING_ERROR = 'api.error.product-payload-height-missing',
  PRODUCT_WIDTH_MISSING_ERROR = 'api.error.product-payload-width-missing',
  PRODUCT_THICKNESS_MISSING_ERROR = 'api.error.product-payload-thickness-missing',
  PRODUCT_TYPE_MISSING_ERROR = 'api.error.product-payload-type-missing',
  PRODUCT_SHELVE_MISSING_ERROR = 'api.error.product-payload-shelve-missing',

  PRODUCT_NOT_FOUND = 'api.error.product-not-found-delete',
  PRODUCT_DELETE_ERROR = 'api.error.product-delete',
  PRODUCT_LIST_ERROR = 'api.error.product-list',
  PRODUCT_CREATE_ERROR = 'api.error.product-create',
  PRODUCT_UPDATE_ERROR = 'api.error.product-update',

  PRODUCT_UPDATE_SUCCESS = 'api.success.product-update',
  PRODUCT_CREATE_SUCCESS = 'api.success.product-create',
  PRODUCT_DELETE_SUCCESS = 'api.success.product-delete',




  CONSUMPTION_NOT_FOUND = 'api.error.consumption-not-found-delete',
  CONSUMPTION_DELETE_ERROR = 'api.error.consumption-delete',
  CONSUMPTION_LIST_ERROR = 'api.error.consumption-list',
  CONSUMPTION_LIST_BY_SHELVE_ERROR = 'api.error.consumption-list-by-shelve',
  CONSUMPTION_CREATE_ERROR = 'api.error.consumption-create',
  CONSUMPTION_UPDATE_ERROR = 'api.error.consumption-update',

  CONSUMPTION_UPDATE_SUCCESS = 'api.success.consumption-update',
  CONSUMPTION_CREATE_SUCCESS = 'api.success.consumption-create',
  CONSUMPTION_DELETE_SUCCESS = 'api.success.consumption-delete',


  CREDENTIAL_ID_MISSING_ERROR ='api.error.credential-payload-id-missing',
  CREDENTIAL_MAIL_MISSING_ERROR ='api.error.credential-payload-mail-missing',
  CREDENTIAL_PASSWORD_MISSING_ERROR ='api.error.credential-payload-password-missing',
  CREDENTIAL_USERNAME_MISSING_ERROR ='api.error.credential-payload-username-missing',
  CREDENTIAL_ISADMIN_MISSING_ERROR ='api.error.credential-payload-isadmin-missing',
  CREDENTIAL_SECTION_MISSING_ERROR ='api.error.credential-payload-section-missing',
  CREDENTIAL_FIRSTNAME_MISSING_ERROR ='api.error.credential-payload-firstname-missing',
  CREDENTIAL_LASTNAME_MISSING_ERROR ='api.error.credential-payload-lastname-missing',


  MEMBER_CREATE_ERROR =  'api.error.member-create',
  MEMBER_UPDATE_ERROR = 'api.error.member-update',


}