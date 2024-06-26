import {Routes} from '@angular/router';
import {AppNode} from '@shared';

export const productRoutes: Routes = [
  {
    path: `${AppNode.PDF}`,
    loadComponent: () => import('./page/')
      .then(c => c.ProductQrCodePdfComponent)
  },
  {
    path: `${AppNode.DETAIL}`,
    loadComponent: () => import('./page/')
      .then(c => c.ProductDetailPageComponent)
  },
  {
    path: `${AppNode.LIST}`,
    loadComponent: () => import('./page/')
      .then(c => c.ProductListPageComponent)
  },
  {
    path: `${AppNode.ORDER}`,
    loadComponent: () => import('./page/')
      .then(c => c.ProductCommandComponent)
  }
]
