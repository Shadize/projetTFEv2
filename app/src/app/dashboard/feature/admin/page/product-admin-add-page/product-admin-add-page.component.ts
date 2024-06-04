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
export class ProductAdminAddPageComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  private stockService: StockService = inject(StockService);
  private router: Router = inject(Router);
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.stockService.list$()));
  public actions$: WritableSignal<CardActionDefinition[]> = signal(this.getActions());
  public formValue?: any;

  ngOnInit(): void {
    this.stockService.list();
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message'
  })
  cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }

  genFormConfigs(list: Stock[] | undefined): FormConfig {
    let product: Product = this.productUtils.getEmpty();

    return this.productUtils.getDataFormConfig(product, this.stockUtils.toDTOS(list), this.shelveUtils.toDTO(this.shelveUtils.getEmpty()), false, 'feature.admin.product.title-add');
  }

  onFormSubmitted(formValue: any): void {
    this.productService.create(this.productUtils.genCreatePayload({
      ...formValue
    }, this.stockUtils.toDTOS(this.stockService.list$()!))).subscribe();
  }

  onActionClick(action: CardActionDefinition): void {
    switch (action.action) {
      case FormAction.SAVE:
        console.log(this.formValue)
        break;
      case FormAction.CANCEL:
        this.cancel();
        break;
    }
  }

  private getActions(): CardActionDefinition[] {
    return [
      {
        icon: 'fa-regular fa-floppy-disk',
        action: FormAction.SAVE
      },
      {
        icon: 'fa-regular fa-arrow-rotate-left',
        action: FormAction.CANCEL
      }
    ]
  }
}
