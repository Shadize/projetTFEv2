import {Component, computed, inject, Input, OnInit, Signal, signal, WritableSignal,} from '@angular/core';
import {ProductService, ProductUtilsService} from '../../service';
import {Product} from '../../data';
import {tap} from 'rxjs';
import {CardActionDefinition, DetailCardConfig} from 'app/shared/ui/card/data/config/card-config';
import {
  AppRoutes,
  CardComponent,
  CardHeaderComponent,
  CellActionDefinition,
  confirmDialog,
  DataTableComponent,
  DataTableConfig,
  FormBuilderComponent,
  FormError,
} from '@shared';
import {DataCardComponent} from 'app/shared/ui/card/component/data-card/data-card.component';
import {FormConfig} from 'app/shared/ui/form/data';
import {
  Consumption,
  ConsumptionAction,
  ConsumptionForm,
  ConsumptionService,
  ConsumptionStatus,
  ConsumptionUtilsService
} from '@consumption-feature';
import {ProductUpdatePayload} from '../../data/payload/product-update.payload';
import {Shelve, ShelveDto, ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {SecurityService} from '@security';
import {FormAction} from '@admin-feature';
import {Router} from '@angular/router';
import {parse} from 'date-fns';
import {ConsumptionType} from '../../../consumption/data/enum/consumption-type.enum';
import {FormGroup} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
  imports: [
    DataCardComponent,
    CardComponent,
    CardHeaderComponent,
    DataTableComponent,
    FormBuilderComponent,
    TranslateModule,
  ],
})
export class ProductDetailPageComponent implements OnInit {
  @Input() id!: string;
  private readonly productService: ProductService = inject(ProductService);
  private readonly productUtils: ProductUtilsService = inject(ProductUtilsService);
  private readonly consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  private readonly consumptionService: ConsumptionService = inject(ConsumptionService);
  private readonly stockService: StockService = inject(StockService);
  private readonly stockUtils: StockUtilsService = inject(StockUtilsService);
  private readonly shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  private readonly securityService: SecurityService = inject(SecurityService);
  private readonly router: Router = inject(Router);
  private formGroup!: FormGroup;
  private selectedQuantity!: number;
  protected config$: Signal<DetailCardConfig> = computed(() => this.genCardConfigs(this.detail$(), this.shelveDetail$()));
  protected actions$: Signal<CardActionDefinition[]> = computed(() => this.getActions(this.detail$()));
  protected consumptionActions$: Signal<CardActionDefinition[]> = computed(() => this.getConsumptionActions(this.isAddingConsumption$()));
  protected consumptionFormConfig$: Signal<FormConfig> = computed(() => this.genConsumptionFormConfigs());
  protected consumptionDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionTableConfig(this.detail$()!));
  protected detail$: WritableSignal<Product> = signal(this.productUtils.getEmpty());
  protected shelveDetail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$(), this.detail$()));
  protected isAddingConsumption$: WritableSignal<boolean> = signal(false);
  protected productConsume$: WritableSignal<Product | null> = signal(null);
  protected errors$: WritableSignal<FormError[]> = signal([]);

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(): void {
    this.stockService.list();
    this.productService.detail(this.id).pipe(
      tap((detail: Product) => this.detail$.set(detail))
    ).subscribe();
  }

  genCardConfigs(product: Product, shelve: Shelve): DetailCardConfig {
    return this.productUtils.getDataCardConfig(product!, shelve);
  }

  onActionClicked(data: CellActionDefinition): void {
    const item: Consumption = data.data! as Consumption;
    switch (data.action) {
      case ConsumptionAction.DELETE:
        this.handleConsumptionDelete(item.id);
        break;
      case ConsumptionAction.DELIVERED:
        this.handleConsumptionDeliver(item.id);
        break;
    }
  }

  genConsumptionTableConfig(product: Product): DataTableConfig {
    return this.consumptionUtils.getDataTableConfig(product.consumptions, true);
  }

  genConsumptionFormConfigs(): FormConfig {
    return this.consumptionUtils.getDataFormConfig(this.consumptionUtils.getEmptyFormData(), 'feature.admin.consumption.title-add');
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message'
  })
  cancel(): void {
    this.isAddingConsumption$.set(false);
  }

  public add(): void {
    this.productConsume$.set(this.detail$());
    this.selectedQuantity = 1;
    this.isAddingConsumption$.set(true);
  }

  public actionCardClicked(action: CardActionDefinition): void {
    switch (action.action) {
      case FormAction.SAVE:
        this.onFormSubmitted(this.formGroup.value);
        break;
      case FormAction.UPDATE:
        this.update();
        break;
      case FormAction.ADD:
        this.add();
        break;
      case FormAction.DELETE:
        this.delete();
        break;
    }
  }

  public getShelveDetail(stocks: Stock[] | undefined, product: Product | null): Shelve {
    if (!stocks) {
      this.stockService.list();
      return this.shelveUtils.getEmpty();
    }
    return this.shelveUtils.getShelveForProduct(stocks, product);
  }

  public onFormSubmitted(formValue: ConsumptionForm): void {
    if (formValue.consumption_type === ConsumptionType.RESERVATION && formValue.delivery_date.length === 0) {
      this.errors$.set([{control: 'delivery_date', error: 'needed', value: true}])
      return;
    }
    const shelve:Shelve = this.shelveUtils.getShelveForProduct(this.stockService.list$()!, this.detail$());
    const consumption: Consumption = this.createConsumption(formValue, shelve, this.detail$());
    this.updateProductAndConsumption(this.detail$(), consumption, shelve);
  }

  public setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }

  private handleConsumptionDelete(id: string): void {
    this.consumptionService.delete(id).pipe(
      tap(() => this.isAddingConsumption$.set(false))
    ).subscribe();
  }

  private handleConsumptionDeliver(id: string): void {
    // Implementation here if needed
  }

  private createConsumption(formValue: ConsumptionForm, shelve: Shelve, product: Product): Consumption {
    const consumption: Consumption = {
      order_date: parse(formValue.order_date, 'dd-MM-yyyy', new Date()),
      quantity: this.selectedQuantity,
      is_reserved: formValue.consumption_type === "RESERVATION",
      is_delivered: formValue.consumption_type !== "RESERVATION",
      consumption_type: formValue.consumption_type,
      order_date_str:'',
      delivery_date_str:'',
      type: product.type,
      status: ConsumptionStatus.ACTIVE,
      shelve: shelve.str,
      shelve_reference: shelve.id,
      author: this.securityService.account$(),
      productName: `${product.title} ${product.str}`,
      id: '',
      str: '',
      isEmpty: false
    };
    if (formValue.consumption_type === ConsumptionType.RESERVATION) {
      consumption.delivery_date = parse(formValue.delivery_date, 'yyyy-MM-dd', new Date());
    } else {
      consumption.delivery_date = new Date();
    }
    return consumption;
  }

  private updateProductAndConsumption(product: Product, consumption: Consumption, shelve: Shelve): void {
    product.quantity -= this.selectedQuantity;
    product.consumptions.push(consumption);

    const productUpdatePayload: ProductUpdatePayload = this.productUtils.toUpdatePayload(
      product,
      this.stockUtils.toDTOS(this.stockService.list$()),
      shelve.id,
      this.consumptionUtils.toDTOS(product.consumptions)
    );

    this.productService.update(productUpdatePayload, false).pipe(
      tap(() => this.stockService.list())
    ).subscribe(() => {
      this.isAddingConsumption$.set(false);
      this.productService.detail(this.id).pipe(
        tap((detail: Product) => this.detail$.set(detail))
      ).subscribe();
    });
  }

  private getActions(product: Product): CardActionDefinition[] {
    return [
      {
        icon: 'fa-regular fa-pencil',
        action: FormAction.UPDATE,
        isDisabled: false,
      }, {
        icon: 'fa-regular fa-trash',
        action: FormAction.DELETE,
        isDisabled: false
      }
    ];
  }

  @confirmDialog({
    title: 'common.delete-form.confirm-title',
    message: 'common.delete-form.confirm-message'
  })
  private delete(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT]).then();
  }

  private update(): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT_UPDATE]).then();
  }

  private getConsumptionActions(isAddinConsumption: boolean): CardActionDefinition[] {
    if (isAddinConsumption) {
      return [
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
    }
    return [
      {
        icon: 'fa-regular fa-plus',
        action: FormAction.ADD,
        isDisabled: false,
      }
    ];
  }
}
