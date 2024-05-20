import {Routes} from '@angular/router';
import {AdminRouterComponent} from './router';
import {AppNode} from '@shared';

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
        path: AppNode.MEMBER,
        loadComponent: () =>
          import('./page').then(c => c.MemberManagementPageComponent)
      },
      {
        path: AppNode.SHELVES,
        loadComponent: () =>
          import('./page').then(c => c.ShelveManagementPageComponent)
      }
    ]
  }
]
