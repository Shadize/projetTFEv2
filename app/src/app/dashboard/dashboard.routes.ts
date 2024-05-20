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
                loadComponent: () => import('./home/page/dashboard-home-page/dashboard-home-page.component')
                    .then(c => c.DashboardHomePageComponent),
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
            }
        ]
    }
]
