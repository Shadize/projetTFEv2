import {AppNode} from './node.enum';

export enum AppRoutes {
    AUTHENTICATED = `/${AppNode.AUTHENTICATED}`,
    ACCOUNT_PARAMETER = `/${AppNode.AUTHENTICATED}/${AppNode.ACCOUNT_PARAMETER}`,
    MEMBER = `${AppRoutes.AUTHENTICATED}/${AppNode.MEMBER}`,
    MEMBER_DETAIL = `${AppRoutes.MEMBER}/detail/`
}
