export enum AppNode {
    AUTHENTICATED = 'dashboard',
    PUBLIC = 'account',
    REDIRECT_TO_PUBLIC = AppNode.PUBLIC,
    REDIRECT_TO_AUTHENTICATED = AppNode.AUTHENTICATED,
    MEMBER = 'member',
    DETAIL = 'detail/:id',
    SIGN_IN = 'signin',
    ACCOUNT_PARAMETER = 'parameter',
    FALL_BACK = '**',
    SIGN_UP='signup',
}
