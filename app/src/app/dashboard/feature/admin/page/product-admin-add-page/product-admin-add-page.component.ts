import {
  Component,
  OnInit,
  Signal,
  computed,
  inject, WritableSignal, signal,
} from '@angular/core';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {Product} from '@product-feature';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {Shelve, ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {AppRoutes, CardActionDefinition, CardComponent, confirmDialog, FormBuilderComponent} from '@shared';
import {Router} from '@angular/router';
import {FormAction} from '@admin-feature';
import {ProductAdminFormComponent} from '../../component';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  templateUrl: './product-admin-add-page.component.html',
  styleUrl: './product-admin-add-page.component.scss',
  imports: [FormBuilderComponent, CardComponent, ProductAdminFormComponent]
})
export class ProductAdminAddPageComponent {
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
}
