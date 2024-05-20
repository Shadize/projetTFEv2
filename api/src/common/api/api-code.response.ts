export enum ApiCodeResponse {
  TEST = "api.result.test",
  PAYLOAD_PARAM_IS_MISSING = "api.error.payload-param-is-missing",
  COMMON_SUCCESS = "api.success.common",
  COMMON_ERROR = "api.error.common",
  ME_SUCCESS = "api.success.me",

  SIGN_IN_SUCCESS = "api.success.signin",
  SIGN_IN_ERROR = "api.error.signin",
  SIGN_IN_PAYLOAD_USERNAME_MISSING = "api.error.signin-payload-username-missing",
  SIGN_IN_PAYLOAD_USERNAME_LENGTH_ERROR = "api.error.signin-payload-username-length",
  SIGN_IN_PAYLOAD_PASSWORD_MISSING = "api.error.signin-payload-password-missing",
  SIGN_IN_PAYLOAD_SOCIAL_LOGIN_MISSING = "api.error.signin-payload-social-login-missing",

  SIGNUP_ERROR = "api.error.signup",
  SIGNUP_SUCCESS = "api.success.signup",
  SIGNUP_PAYLOAD_USERNAME_IS_MISSING = "api.error.signup-payload-username-is-missing",
  SIGNUP_PAYLOAD_USERNAME_LENGTH_ERROR = "api.error.signup-payload-username-length",
  SIGNUP_PAYLOAD_PASSWORD_IS_MISSING = "api.error.signup-payload-password-is-missing",
  SIGNUP_PAYLOAD_PASSWORD_LENGTH_ERROR = "api.error.signup-payload-.password-length",
  SIGNUP_PAYLOAD_MAIL_IS_MISSING = "api.error.signup-payload-mail-empty",
  SIGNUP_PAYLOAD_MAIL_INVALID = "api.error.signup-payload-mail-invalid",

  USER_NOT_FOUND = "api.error.user-not-found",
  USER_ALREADY_EXIST = "api.error.user-already-exist",
  TOKEN_GEN_ERROR = "api.error.token-generator",
  NO_TOKEN_FOUNDED = "api.error.no-token-founded",
  TOKEN_EXPIRED = "api.error.token-expired",
  CREDENTIAL_DELETE_ERROR = "api.error.account-delete",
  CREDENTIAL_DELETE_SUCCESS = "api.success.account-delete",
  PAYLOAD_IS_NOT_VALID = "api.error.payload-is-not-valid",


  CURSUS_ID_LENGTH_ERROR = "api.error.cursus-payload-id-length",
  CURSUS_ID_MISSING_ERROR = "api.error.cursus-payload-id-missing",
  CURSUS_TITLE_LENGTH_ERROR = "api.error.cursus-payload-title-length",
  CURSUS_TITLE_MISSING_ERROR = "api.error.cursus-payload-title-missing",


  LESSON_ID_LENGTH_ERROR = "api.error.lesson-payload-id-length",
  LESSON_ID_MISSING_ERROR = "api.error.lesson-payload-id-missing",
  LESSON_TITLE_LENGTH_ERROR = "api.error.lesson-payload-title-length",
  LESSON_TITLE_MISSING_ERROR = "api.error.lesson-payload-title-missing",
  LESSON_CURSUS_LENGTH_ERROR = "api.error.lesson-payload-cursus-length",
  LESSON_CURSUS_MISSING_ERROR = "api.error.lesson-payload-cursus-missing",

  CURSUS_NOT_FOUND = "api.error.cursus-not-found-delete",
  CURSUS_DELETE_ERROR = "api.error.cursus-delete",
  CURSUS_LIST_ERROR = "api.error.cursus-list",
  CURSUS_CREATE_ERROR = "api.error.cursus-create",
  CURSUS_UPDATE_ERROR = "api.error.cursus-update",

  LESSON_NOT_FOUND = "api.error.lesson-not-found-delete",
  LESSON_DELETE_ERROR = "api.error.lesson-delete",
  LESSON_LIST_ERROR = "api.error.lesson-list",
  LESSON_CREATE_ERROR = "api.error.lesson-create",
  LESSON_UPDATE_ERROR = "api.error.lesson-update",


}