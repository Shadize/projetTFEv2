import {Component, computed, DestroyRef, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Product, ProductService, ProductUtilsService} from '@product-feature';
import {
  AppRoutes,
  CardActionDefinition,
  CardComponent,
  confirmDialog,
  FormBuilderComponent,
  FormConfig,
  FormError, getFormValidationErrors,
  handleFormError
} from '@shared';
import {Router} from '@angular/router';
import {FormAction} from '@admin-feature';
import {Observable, tap} from 'rxjs';
import {ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {FormGroup} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-product-admin-form',
  standalone: true,
  imports: [
    CardComponent,
    FormBuilderComponent,
    JsonPipe,
    TranslateModule
  ],
  templateUrl: './product-admin-form.component.html',
  styleUrl: './product-admin-form.component.scss'
})
export class ProductAdminFormComponent implements OnInit {
  @Input({required: true}) product!: Product;
  public formGroup?: FormGroup<any>;

  protected errors$: WritableSignal<FormError[]> = signal([]);
  protected actions$: Signal<CardActionDefinition[]> = computed(() => this.getActions(this.product, this.errors$()));
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.stockService.list$(), this.product));
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  private stockService: StockService = inject(StockService);
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {

    this.stockService.list();
  }

  public setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
    handleFormError(this.formGroup, this.errors$, this.destroyRef);
  }

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

  private genFormConfigs(list: Stock[] | undefined, product: Product): FormConfig {
    const config = this.productUtils.getDataFormConfig(product, this.stockUtils.toDTOS(list),
      this.shelveUtils.toDTO(this.shelveUtils.getEmpty()), !this.product.isEmpty, 'feature.admin.product.title-add');
    return config;
  }

  private getActions(product: Product, errors: FormError[]): CardActionDefinition[] {
    const actions: CardActionDefinition[] = [
      {
        icon: 'fa-regular fa-floppy-disk',
        action: FormAction.SAVE,
        isDisabled: false
      },
      {
        icon: 'fa-regular fa-arrow-rotate-left',
        action: FormAction.CANCEL,
        isDisabled: false
      }
    ];
    if (!product.isEmpty) {
      actions.push({
        icon: 'fa-regular fa-trash',
        action: FormAction.DELETE,
        isDisabled: false
      });
    }
    return actions;
  }

  // Actions area
  private save(): void {
    if (this.formGroup?.valid && this.formGroup?.value) {
      let obs: Observable<Product>;
      if (this.product.isEmpty) {
        obs = this.productService.create(
          this.productUtils.genCreatePayload(this.formGroup?.value,
            this.stockUtils.toDTOS(this.stockService.list$()!))
        )
      } else {
        obs = this.productService.update(
          this.productUtils.genUpdatePayload({
            ...this.formGroup?.value,
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
    if (this.formGroup?.invalid) {
      this.errors$.set(getFormValidationErrors(this.formGroup));
    }
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message'
  })
  private cancel(): void {
    this.router.navigate([AppRoutes.PRODUCT_LIST]).then();
  }

  @confirmDialog({
    title: 'common.delete-form.confirm-title',
    message: 'common.delete-form.confirm-message'
  })
  private delete(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }
}
