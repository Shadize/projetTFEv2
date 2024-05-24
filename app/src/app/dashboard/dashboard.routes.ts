import { shelveRoutes } from './feature/shelve/shelve.routes';
import {Routes} from '@angular/router';
import {AppNode} from '@shared';

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./router/dashboard-router/dashboard-router.component')
            .then(c => c.DashboardRouterComponent),
        children: [
            {
                path: '',
                redirectTo: `${AppNode.SHELVES}/${AppNode.LIST}`,
                pathMatch: 'full'
                /*
                loadComponent: () => import('./home/page/dashboard-home-page/dashboard-home-page.component')
                    .then(c => c.DashboardHomePageComponent),
                    */


            },
            {
                path: AppNode.ACCOUNT_PARAMETER,
                loadComponent: () =>
                    import('../security/page/parameter-page/parameter-page.component').then(c => c.ParameterPageComponent),
            },
          {
            path: AppNode.MEMBER,
            loadChildren: () => import('./feature/member/member.routes')
              .then(r => r.memberRoutes)
          },
          {
            path: AppNode.SHELVES,
            loadChildren: () => import('./feature/shelve/shelve.routes')
              .then(r => r.shelveRoutes)
          },
          {
            path: AppNode.ADMIN,
            loadChildren: () => import('./feature/admin/admin.routes')
              .then(r => r.adminRoutes)
          }
        ]
    }
]
