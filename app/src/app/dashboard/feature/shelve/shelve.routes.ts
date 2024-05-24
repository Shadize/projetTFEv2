import { Routes } from "@angular/router";
import { AppNode } from "@shared";

export const shelveRoutes:Routes=[
  {
    path: `${AppNode.LIST}`,
    loadComponent: () => import('./page/shelve-list-page/shelve-list-page.component')
      .then(c => c.ShelveListPageComponent)
  }
]