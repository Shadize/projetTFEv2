import {AppNode} from './node.enum';

export enum AppRoutes {
  AUTHENTICATED = `/${AppNode.AUTHENTICATED}`,
  ACCOUNT_PARAMETER = `/${AppNode.AUTHENTICATED}/${AppNode.ACCOUNT_PARAMETER}`,
  MEMBER = `${AppRoutes.AUTHENTICATED}/${AppNode.MEMBER}`,
  ADMIN = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}`,
  ADMIN_SHELVES = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.SHELVES}`,
  ADMIN_SHELVE_CREATE = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.SHELVE_ADD}`,
  ADMIN_MEMBER = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.MEMBER}`,
  ADMIN_PRODUCT = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.PRODUCT}`,
  ADMIN_PRODUCT_CREATE = `${AppRoutes.AUTHENTICATED}/${AppNode.ADMIN}/${AppNode.PRODUCT_ADD}`,
  MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`
}
