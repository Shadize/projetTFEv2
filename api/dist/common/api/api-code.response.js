"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCodeResponse = void 0;
var ApiCodeResponse;
(function (ApiCodeResponse) {
    ApiCodeResponse["TEST"] = "api.result.test";
    ApiCodeResponse["PAYLOAD_PARAM_IS_MISSING"] = "api.error.payload-param-is-missing";
    ApiCodeResponse["COMMON_SUCCESS"] = "api.success.common";
    ApiCodeResponse["COMMON_ERROR"] = "api.error.common";
    ApiCodeResponse["ME_SUCCESS"] = "api.success.me";
    ApiCodeResponse["SIGN_IN_SUCCESS"] = "api.success.signin";
    ApiCodeResponse["SIGN_IN_ERROR"] = "api.error.signin";
    ApiCodeResponse["SIGN_IN_PAYLOAD_USERNAME_MISSING"] = "api.error.signin-payload-username-missing";
    ApiCodeResponse["SIGN_IN_PAYLOAD_USERNAME_LENGTH_ERROR"] = "api.error.signin-payload-username-length";
    ApiCodeResponse["SIGN_IN_PAYLOAD_PASSWORD_MISSING"] = "api.error.signin-payload-password-missing";
    ApiCodeResponse["SIGN_IN_PAYLOAD_SOCIAL_LOGIN_MISSING"] = "api.error.signin-payload-social-login-missing";
    ApiCodeResponse["SIGNUP_ERROR"] = "api.error.signup";
    ApiCodeResponse["SIGNUP_SUCCESS"] = "api.success.signup";
    ApiCodeResponse["SIGNUP_PAYLOAD_USERNAME_IS_MISSING"] = "api.error.signup-payload-username-is-missing";
    ApiCodeResponse["SIGNUP_PAYLOAD_USERNAME_LENGTH_ERROR"] = "api.error.signup-payload-username-length";
    ApiCodeResponse["SIGNUP_PAYLOAD_PASSWORD_IS_MISSING"] = "api.error.signup-payload-password-is-missing";
    ApiCodeResponse["SIGNUP_PAYLOAD_PASSWORD_LENGTH_ERROR"] = "api.error.signup-payload-.password-length";
    ApiCodeResponse["SIGNUP_PAYLOAD_MAIL_IS_MISSING"] = "api.error.signup-payload-mail-empty";
    ApiCodeResponse["SIGNUP_PAYLOAD_MAIL_INVALID"] = "api.error.signup-payload-mail-invalid";
    ApiCodeResponse["USER_NOT_FOUND"] = "api.error.user-not-found";
    ApiCodeResponse["USER_ALREADY_EXIST"] = "api.error.user-already-exist";
    ApiCodeResponse["TOKEN_GEN_ERROR"] = "api.error.token-generator";
    ApiCodeResponse["NO_TOKEN_FOUNDED"] = "api.error.no-token-founded";
    ApiCodeResponse["TOKEN_EXPIRED"] = "api.error.token-expired";
    ApiCodeResponse["CREDENTIAL_CREATE_ERROR"] = "api.error.account-create";
    ApiCodeResponse["CREDENTIAL_UPDATE_ERROR"] = "api.error.account-update";
    ApiCodeResponse["CREDENTIAL_DELETE_ERROR"] = "api.error.account-delete";
    ApiCodeResponse["CREDENTIAL_LIST_ERROR"] = "api.error.account-list";
    ApiCodeResponse["CREDENTIAL_DELETE_SUCCESS"] = "api.success.account-delete";
    ApiCodeResponse["CREDENTIAL_UPDATE_SUCCESS"] = "api.success.account-update";
    ApiCodeResponse["CREDENTIAL_CREATE_SUCCESS"] = "api.success.account-create";
    ApiCodeResponse["PAYLOAD_IS_NOT_VALID"] = "api.error.payload-is-not-valid";
    ApiCodeResponse["STOCK_ID_LENGTH_ERROR"] = "api.error.stock-payload-id-length";
    ApiCodeResponse["STOCK_ID_MISSING_ERROR"] = "api.error.stock-payload-id-missing";
    ApiCodeResponse["STOCK_TITLE_LENGTH_ERROR"] = "api.error.stock-payload-title-length";
    ApiCodeResponse["STOCK_TITLE_MISSING_ERROR"] = "api.error.stock-payload-title-missing";
    ApiCodeResponse["STOCK_LOCATION_IS_EMPTY"] = "api.error.stock-payload-location-missing";
    ApiCodeResponse["STOCK_TITLE_IS_EMPTY"] = "api.error.stock-payload-title-missing";
    ApiCodeResponse["STOCK_WIDTH_IS_EMPTY"] = "api.error.stock-payload-width-missing";
    ApiCodeResponse["STOCK_HEIGHT_IS_EMPTY"] = "api.error.stock-payload-height-missing";
    ApiCodeResponse["STOCK_SCALE_IS_EMPTY"] = "api.error.stock-payload-scale-missing";
    ApiCodeResponse["LESSON_ID_LENGTH_ERROR"] = "api.error.lesson-payload-id-length";
    ApiCodeResponse["LESSON_ID_MISSING_ERROR"] = "api.error.lesson-payload-id-missing";
    ApiCodeResponse["LESSON_TITLE_LENGTH_ERROR"] = "api.error.lesson-payload-title-length";
    ApiCodeResponse["LESSON_TITLE_MISSING_ERROR"] = "api.error.lesson-payload-title-missing";
    ApiCodeResponse["LESSON_STOCK_LENGTH_ERROR"] = "api.error.lesson-payload-stock-length";
    ApiCodeResponse["LESSON_STOCK_MISSING_ERROR"] = "api.error.lesson-payload-stock-missing";
    ApiCodeResponse["STOCK_DELETE_SUCCESS"] = "api.success.stock-delete";
    ApiCodeResponse["STOCK_CREATE_SUCCESS"] = "api.success.stock-create";
    ApiCodeResponse["STOCK_UPDATE_SUCCESS"] = "api.success.stock-update";
    ApiCodeResponse["STOCK_NOT_FOUND"] = "api.error.stock-not-found-delete";
    ApiCodeResponse["STOCK_DELETE_ERROR"] = "api.error.stock-delete";
    ApiCodeResponse["STOCK_LIST_ERROR"] = "api.error.stock-list";
    ApiCodeResponse["STOCK_CREATE_ERROR"] = "api.error.stock-create";
    ApiCodeResponse["STOCK_UPDATE_ERROR"] = "api.error.stock-update";
    ApiCodeResponse["LESSON_NOT_FOUND"] = "api.error.lesson-not-found-delete";
    ApiCodeResponse["LESSON_DELETE_ERROR"] = "api.error.lesson-delete";
    ApiCodeResponse["LESSON_LIST_ERROR"] = "api.error.lesson-list";
    ApiCodeResponse["LESSON_CREATE_ERROR"] = "api.error.lesson-create";
    ApiCodeResponse["LESSON_UPDATE_ERROR"] = "api.error.lesson-update";
    ApiCodeResponse["CONSUMPTION_IS_MISSING"] = "api.error-consumption-payload-stock-is-missing";
    ApiCodeResponse["PRODUCT_ID_MISSING_ERROR"] = "api.error.product-payload-id-missing";
    ApiCodeResponse["PRODUCT_TITLE_MISSING_ERROR"] = "api.error.product-payload-title-missing";
    ApiCodeResponse["PRODUCT_QUANTITY_MISSING_ERROR"] = "api.error.product-payload-qunatity-missing";
    ApiCodeResponse["PRODUCT_HEIGHT_MISSING_ERROR"] = "api.error.product-payload-height-missing";
    ApiCodeResponse["PRODUCT_WIDTH_MISSING_ERROR"] = "api.error.product-payload-width-missing";
    ApiCodeResponse["PRODUCT_THICKNESS_MISSING_ERROR"] = "api.error.product-payload-thickness-missing";
    ApiCodeResponse["PRODUCT_TYPE_MISSING_ERROR"] = "api.error.product-payload-type-missing";
    ApiCodeResponse["PRODUCT_SHELVE_MISSING_ERROR"] = "api.error.product-payload-shelve-missing";
    ApiCodeResponse["PRODUCT_NOT_FOUND"] = "api.error.product-not-found-delete";
    ApiCodeResponse["PRODUCT_DELETE_ERROR"] = "api.error.product-delete";
    ApiCodeResponse["PRODUCT_LIST_ERROR"] = "api.error.product-list";
    ApiCodeResponse["PRODUCT_CREATE_ERROR"] = "api.error.product-create";
    ApiCodeResponse["PRODUCT_UPDATE_ERROR"] = "api.error.product-update";
    ApiCodeResponse["PRODUCT_UPDATE_SUCCESS"] = "api.success.product-update";
    ApiCodeResponse["PRODUCT_CREATE_SUCCESS"] = "api.success.product-create";
    ApiCodeResponse["PRODUCT_DELETE_SUCCESS"] = "api.success.product-delete";
    ApiCodeResponse["CONSUMPTION_NOT_FOUND"] = "api.error.consumption-not-found-delete";
    ApiCodeResponse["CONSUMPTION_DELETE_ERROR"] = "api.error.consumption-delete";
    ApiCodeResponse["CONSUMPTION_LIST_ERROR"] = "api.error.consumption-list";
    ApiCodeResponse["CONSUMPTION_LIST_BY_SHELVE_ERROR"] = "api.error.consumption-list-by-shelve";
    ApiCodeResponse["CONSUMPTION_LIST_BY_PRODUCT_ERROR"] = "api.error.consumption-list-by-product";
    ApiCodeResponse["CONSUMPTION_LIST_BY_CREDENTIAL_ERROR"] = "api.error.consumption-list-by-credential";
    ApiCodeResponse["CONSUMPTION_CREATE_ERROR"] = "api.error.consumption-create";
    ApiCodeResponse["CONSUMPTION_UPDATE_ERROR"] = "api.error.consumption-update";
    ApiCodeResponse["CONSUMPTION_UPDATE_SUCCESS"] = "api.success.consumption-update";
    ApiCodeResponse["CONSUMPTION_CREATE_SUCCESS"] = "api.success.consumption-create";
    ApiCodeResponse["CONSUMPTION_DELETE_SUCCESS"] = "api.success.consumption-delete";
    ApiCodeResponse["CREDENTIAL_ID_MISSING_ERROR"] = "api.error.credential-payload-id-missing";
    ApiCodeResponse["CREDENTIAL_MAIL_MISSING_ERROR"] = "api.error.credential-payload-mail-missing";
    ApiCodeResponse["CREDENTIAL_PASSWORD_MISSING_ERROR"] = "api.error.credential-payload-password-missing";
    ApiCodeResponse["CREDENTIAL_USERNAME_MISSING_ERROR"] = "api.error.credential-payload-username-missing";
    ApiCodeResponse["CREDENTIAL_ISADMIN_MISSING_ERROR"] = "api.error.credential-payload-isadmin-missing";
    ApiCodeResponse["CREDENTIAL_SECTION_MISSING_ERROR"] = "api.error.credential-payload-section-missing";
    ApiCodeResponse["CREDENTIAL_FIRSTNAME_MISSING_ERROR"] = "api.error.credential-payload-firstname-missing";
    ApiCodeResponse["CREDENTIAL_LASTNAME_MISSING_ERROR"] = "api.error.credential-payload-lastname-missing";
    ApiCodeResponse["MEMBER_CREATE_ERROR"] = "api.error.member-create";
    ApiCodeResponse["MEMBER_UPDATE_ERROR"] = "api.error.member-update";
})(ApiCodeResponse || (exports.ApiCodeResponse = ApiCodeResponse = {}));
//# sourceMappingURL=api-code.response.js.map