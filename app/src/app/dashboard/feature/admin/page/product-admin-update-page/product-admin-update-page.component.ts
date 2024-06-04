import {Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal} from '@angular/core';
import {Product} from '@product-feature';
import {AppRoutes, CardComponent, FormBuilderComponent} from '@shared';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {tap} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {Router} from '@angular/router';


@Component({
    selector: 'app-product-admin-update-page',
    standalone: true,
    templateUrl: './product-admin-update-page.component.html',
    styleUrl: './product-admin-update-page.component.scss',
    imports: [FormBuilderComponent, JsonPipe, CardComponent]
})
export class ProductAdminUpdatePageComponent implements OnInit {

  @Input() id!: string;
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected productService: ProductService = inject(ProductService);
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  protected stockService: StockService = inject(StockService);
  private router: Router = inject(Router);
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.detail$(), this.stockService.list$()));
  public detail$: WritableSignal<Product | null> = signal(null);


  ngOnInit(): void {
    this.stockService.list();
    this.productService.detail(this.id).pipe(
      tap((detail: Product) => this.detail$.set(detail))
    ).subscribe()

    
  }

  genFormConfigs(product: Product | null, stocks: Stock[] | undefined): FormConfig {
    const detail = product ?? this.productUtils.getEmpty();
    return this.productUtils.getDataFormConfig(detail, this.stockUtils.toDTOS(stocks), this.shelveUtils.toDTO(this.shelveUtils.getEmpty()), true, 'feature.admin.product.title-update');

  }


  cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }

  onFormSubmitted(formValue: any): void {
    console.log('shelve', formValue.shelve);
    this.productService.update(this.productUtils.genUpdatePayload({
      id: this.detail$()!.id,
      ...formValue
    }, this.stockUtils.toDTOS(this.stockService.list$()!), formValue.shelve)).subscribe();
  }
}
