import {Routes} from '@angular/router';
import {AppNode} from '@shared';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: AppNode.PRODUCT,
    pathMatch: 'full'
  },
  {
    path: AppNode.PRODUCT,
    loadComponent: () =>
      import('./page').then(c => c.ProductManagementPageComponent)
  },
  {
    path: AppNode.PRODUCT_ADD,
    loadComponent: () =>
      import('./page').then(c => c.ProductAdminAddPageComponent)
  },
  {
    path: `${AppNode.PRODUCT_UPDATE}`,
    loadComponent: () =>
      import('./page').then(c => c.ProductAdminUpdatePageComponent)
  },
  {
    path: AppNode.MEMBER,
    loadComponent: () =>
      import('./page').then(c => c.MemberManagementPageComponent)
  },
  {
    path: AppNode.MEMBER_ADD,
    loadComponent: () =>
      import('./page').then(c => c.MemberAdminAddPageComponent)
  },
  {
    path: `${AppNode.MEMBER_UPDATE}`,
    loadComponent: () =>
      import('./page').then(c => c.MemberAdminUpdatePageComponent)
  },
  {
    path: AppNode.SHELVE_ADD,
    loadComponent: () =>
      import('./page').then(c => c.StockAdminAddPageComponent)
  },
  {
    path: `${AppNode.SHELVE_UPDATE}`,
    loadComponent: () =>
      import('./page').then(c => c.StockAdminUpdatePageComponent)
  },
  {
    path: `${AppNode.SHELVES}/${AppNode.DETAIL}`,
    loadComponent: () =>
      import('./page').then(c => c.StockAdminDetailPageComponent)
  }
]
