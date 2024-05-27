import { Product } from '../../../product/data/business/product.business';
import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilderComponent } from '../../../../../shared/ui/form/component/form-builder/form-builder.component';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { ProductCreatePayload, ProductKey } from '@product-feature';
import { Validators } from '@angular/forms';
import { ProductService, ProductUtilsService } from 'app/dashboard/feature/product/service';
import { Shelve, Stock, StockService } from '@shelve-feature';
import { CardHeaderComponent } from "../../../../../shared/ui/card/component/card-header/card-header.component";
import { CardComponent } from "../../../../../shared/ui/card/component/card/card.component";

@Component({
    selector: 'app-product-create-page',
    standalone: true,
    templateUrl: './product-admin-create-page.component.html',
    styleUrl: './product-admin-create-page.component.scss',
    imports: [FormBuilderComponent, CardHeaderComponent, CardComponent]
})
export class ProductAdminCreatePageComponent implements OnInit {
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
