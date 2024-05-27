export enum AppNode {
  AUTHENTICATED = 'dashboard',
  PUBLIC = 'account',
  REDIRECT_TO_PUBLIC = AppNode.PUBLIC,
  REDIRECT_TO_AUTHENTICATED = AppNode.AUTHENTICATED,
  MEMBER = 'member',
  DETAIL = 'detail/:id',
  LIST = 'list',
  SIGN_IN = 'signin',
  ACCOUNT_PARAMETER = 'parameter',
  ADMIN = 'admin',
  SHELVES = 'shelves',
  PRODUCT = 'product',
  FALL_BACK = '**',
  SIGN_UP = 'signup',
  SHELVE_ADD = 'shelves/add',
  SHELVE_UPDATE = 'shelves/update/:id',
  PRODUCT_ADD = 'product/add',
  PRODUCT_UPDATE = 'product/update/:id',
  MEMBER_ADD ='member/add',
  MEMBER_UPDATE = 'member/update/:id'
  
}
