
import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { Product } from '@product-feature';
import { ProductService, ProductUtilsService } from 'app/dashboard/feature/product/service';
import { Stock, StockService } from '@shelve-feature';
import { FormBuilderComponent } from '@shared';

@Component({
    selector: 'app-product-create-page',
    standalone: true,
    templateUrl: './product-admin-add-page.component.html',
    styleUrl: './product-admin-add-page.component.scss',
    imports: [FormBuilderComponent]
})
export class ProductAdminAddPageComponent implements OnInit {
  private productService : ProductService = inject(ProductService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  private stockService: StockService = inject(StockService);
  protected config$: Signal<FormConfig> = computed (() => this.genFormConfigs(this.stockService.list$()));

  ngOnInit(): void {
    this.stockService.list();
  }

  genFormConfigs(list : Stock[] | undefined): FormConfig {
    let product: Product = this.productUtils.getEmpty();

    return this.productUtils.getDataFormConfig(product, list);
  }

  onFormSubmitted(formValue: any): void {

    this.productService.create(this.productUtils.genCreatePayload({
      ...formValue
    }));


  }
}
