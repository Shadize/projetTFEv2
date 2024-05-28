import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
} from '@angular/core';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {Product} from '@product-feature';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {FormBuilderComponent} from '@shared';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  templateUrl: './product-admin-add-page.component.html',
  styleUrl: './product-admin-add-page.component.scss',
  imports: [FormBuilderComponent]
})
export class ProductAdminAddPageComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private shelveUtils:ShelveUtilsService = inject(ShelveUtilsService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  private stockUtils:StockUtilsService = inject(StockUtilsService);
  private stockService: StockService = inject(StockService);
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.stockService.list$()));

  ngOnInit(): void {
    this.stockService.list();
  }

  genFormConfigs(list: Stock[] | undefined): FormConfig {
    let product: Product = this.productUtils.getEmpty();

    return this.productUtils.getDataFormConfig(product, this.stockUtils.toDTOS(list), this.shelveUtils.toDTO(this.shelveUtils.getEmpty()));
  }

  onFormSubmitted(formValue: any): void {
    this.productService.create(this.productUtils.genCreatePayload({
      ...formValue
    }, this.stockUtils.toDTOS(this.stockService.list$()!), formValue.shelve)).subscribe();
  }
}
