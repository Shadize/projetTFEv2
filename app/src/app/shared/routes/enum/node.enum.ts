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
  PDF = 'pdf',
  ADMIN = 'admin',
  SHELVES = 'shelves',
  SHELVE = 'shelve',
  PRODUCT = 'product',
  FALL_BACK = '**',
  SIGN_UP = 'signup',
  ORDER='order/:id',
  SHELVE_ADD = 'shelves/add',
  SHELVE_UPDATE = 'shelves/update/:id',
  PRODUCT_ADD = 'product/add',
  PRODUCT_UPDATE = 'product/update/:id',
  MEMBER_ADD = 'member/add',
  MEMBER_UPDATE = 'member/update/:id',
  REDIRECT_TO_MEMBER_LIST = `${AppNode.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.MEMBER}`,
  REDIRECT_TO_PRODUCT_LIST = `${AppNode.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.PRODUCT}`,
  CONSUMPTION = 'consumption'
}
