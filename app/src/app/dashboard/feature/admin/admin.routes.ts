import { ProductCreatePageComponent } from './page/product-create-page/product-create-page.component';
import {Routes} from '@angular/router';
import {AdminRouterComponent} from './router';
import {AppNode, AppRoutes} from '@shared';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminRouterComponent,
    children: [
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
          import('./page').then(c => c.ProductCreatePageComponent)
      },
      {
        path: AppNode.MEMBER,
        loadComponent: () =>
          import('./page').then(c => c.MemberManagementPageComponent)
      },
      {
        path: AppNode.SHELVES,
        loadComponent: () =>
          import('./page').then(c => c.ShelveManagementPageComponent)
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
  }
]
