import { MemberListPageComponent } from './page/member-list-page/member-list-page.component';
import {Routes} from '@angular/router';
import {AppNode} from '@shared';

export const memberRoutes:Routes=[
  {
    path: `${AppNode.DETAIL}`,
    loadComponent: () => import('./page/member-detail-page/member-detail-page.component')
      .then(c => c.MemberDetailPageComponent)
  },
  {
    path: `${AppNode.LIST}`,
    loadComponent: () => import('./page/member-list-page/member-list-page.component')
      .then(c => c.MemberListPageComponent)
  }
]
