import {Routes} from "@angular/router";
import {AppNode} from "@shared";

export const shelveRoutes: Routes = [
  {
    path: `${AppNode.LIST}`,
    loadComponent: () => import('./page')
      .then(c => c.ShelveListPageComponent)
  },
  {
    path: `${AppNode.DETAIL}`,
    loadComponent: () => import('./page')
      .then(c => c.StockDetailPageComponent)
  },
  {
    path: `${AppNode.SHELVES}-${AppNode.DETAIL}`,
    loadComponent: () => import('./page')
      .then(c => c.ShelveDetailPageComponent)
  }
]
