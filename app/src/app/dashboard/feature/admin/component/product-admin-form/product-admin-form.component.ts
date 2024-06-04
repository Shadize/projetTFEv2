import {Component, computed, inject, Input, Signal, signal, WritableSignal} from '@angular/core';
import {Product, ProductForm, ProductService, ProductUtilsService} from '@product-feature';
import {AppRoutes, CardActionDefinition, CardComponent, confirmDialog, FormBuilderComponent} from '@shared';
import {Router} from '@angular/router';
import {FormAction} from '@admin-feature';
import {Observable, tap} from 'rxjs';
import {ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {FormConfig} from '../../../../../shared/ui/form/data';

@Component({
  selector: 'app-product-admin-form',
  standalone: true,
  imports: [
    CardComponent,
    FormBuilderComponent
  ],
  templateUrl: './product-admin-form.component.html',
  styleUrl: './product-admin-form.component.scss'
})
export class ProductAdminFormComponent {
  @Input({required: true}) product!: Product;
  public formValue?: ProductForm;

  protected actions$: WritableSignal<CardActionDefinition[]> = signal(this.getActions());
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.stockService.list$()));
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  private stockService: StockService = inject(StockService);
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);

  public actionCardClicked(action: CardActionDefinition): void {
    switch (action.action) {
      case FormAction.SAVE:
        this.save();
        break;
      case FormAction.CANCEL:
        this.cancel();
        break;
      case FormAction.DELETE:
        this.delete();
        break;
    }
  }
  private genFormConfigs(list: Stock[] | undefined): FormConfig {
    let product: Product = this.product ?? this.productUtils.getEmpty();
    return this.productUtils.getDataFormConfig(product, this.stockUtils.toDTOS(list),
      this.shelveUtils.toDTO(this.shelveUtils.getEmpty()), false, 'feature.admin.product.title-add');
  }
  private getActions(): CardActionDefinition[] {
    const actions: CardActionDefinition[] = [
      {
        icon: 'fa-regular fa-floppy-disk',
        action: FormAction.SAVE
      },
      {
        icon: 'fa-regular fa-arrow-rotate-left',
        action: FormAction.CANCEL
      }
    ];
    if (!!this.product?.isEmpty) {
      actions.push({
        icon: 'fa-regular fa-trash',
        action: FormAction.DELETE
      });
    }
    return actions;
  }

  // Actions area
  private save(): void {
    if (this.formValue) {
      let obs: Observable<Product>;
      if (this.product.isEmpty) {
        obs = this.productService.create(
          this.productUtils.genCreatePayload(this.formValue,
            this.stockUtils.toDTOS(this.stockService.list$()!))
        )
      } else {
        obs = this.productService.update(
          this.productUtils.genUpdatePayload({
            ...this.formValue,
            id: this.product.id,
          }, this.stockUtils.toDTOS(this.stockService.list$()!))
        );
      }
      obs.pipe(
        tap((product: Product) => {
          if (!product.isEmpty) {
            this.router.navigate([AppRoutes.PRODUCT_LIST]).then();
          }
        }))
        .subscribe();
    }
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message'
  })
  private cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }

  @confirmDialog({
    title: 'common.delete-form.confirm-title',
    message: 'common.delete-form.confirm-message'
  })
  private delete(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }
}
