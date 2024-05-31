import {Routes} from '@angular/router';
import {AppNode} from '@shared';

export const consumptionRoutes: Routes = [
  {
    path: `${AppNode.LIST}`,
    loadComponent: () => import('./page/')
      .then(c => c.ConsumptionListPageComponent)
  },
]
