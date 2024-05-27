import {Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal} from '@angular/core';
import {Product} from '@product-feature';
import {FormBuilderComponent} from '@shared';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {tap} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {Stock, StockService} from '@shelve-feature';


@Component({
  selector: 'app-product-admin-update-page',
  standalone: true,
  templateUrl: './product-admin-update-page.component.html',
  styleUrl: './product-admin-update-page.component.scss',
  imports: [FormBuilderComponent, JsonPipe]
})
export class ProductAdminUpdatePageComponent implements OnInit {

  @Input() id!: string;
  private productUtils: ProductUtilsService = inject(ProductUtilsService)
  protected productService: ProductService = inject(ProductService)
  protected stockService: StockService = inject(StockService)
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
    return this.productUtils.getDataFormConfig(detail, stocks ?? []);

  }

  onFormSubmitted(formValue: any): void {
    this.productService.update(this.productUtils.genUpdatePayload({
      ...formValue
    }));
  }
}
