import {Component, computed, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {
  Shelve,
  ShelveService,
  ShelveUtilsService,
  Stock,
  StockDetailComponent,
  StockService,
  StockUtilsService
} from '@shelve-feature';
import {
  CardActionDefinition,
  CardComponent,
  CardHeaderComponent,
  CellActionDefinition, confirmDialog,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent,
  FormBuilderComponent, FormError
} from '@shared';
import {flatten} from 'lodash';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {
  Consumption,
  ConsumptionAction,
  ConsumptionForm,
  ConsumptionStatus,
  ConsumptionUtilsService
} from '@consumption-feature';
import {ConsumptionService} from 'app/dashboard/feature/consumption/service/consumption.service';
import {Product} from '@product-feature';
import {SecurityService} from '@security';
import {ProductUpdatePayload} from '../../../product/data/payload/product-update.payload';
import {tap} from 'rxjs';
import {FormAction} from '@admin-feature';
import {FormGroup} from '@angular/forms';
import {ConsumptionType} from '../../../consumption/data/enum/consumption-type.enum';
import {parse} from 'date-fns';

@Component({
  selector: 'app-shelve-detail-page',
  standalone: true,
  templateUrl: './shelve-detail-page.component.html',
  styleUrl: './shelve-detail-page.component.scss',
  imports: [
    StockDetailComponent,
    CardComponent,
    CardHeaderComponent,
    TranslateModule,
    DetailNotFoundComponent,
    JsonPipe,
    DataTableComponent,
    FormBuilderComponent
  ]
})
export class ShelveDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  protected stockUtils: StockUtilsService = inject(StockUtilsService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  protected shelveService: ShelveService = inject(ShelveService);
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected productService: ProductService = inject(ProductService);
  protected consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  protected consumptionService: ConsumptionService = inject(ConsumptionService);
  public productConsume$: WritableSignal<Product | null> = signal(null);
  public securityService: SecurityService = inject(SecurityService);
  public detail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public productDataTableConfig: Signal<DataTableConfig> = computed(() => this.genConfig(this.detail$()));
  public consumptionFormConfig$: Signal<FormConfig> = computed(() => this.genFormConfigs());
  public isAddingConsumption$: WritableSignal<boolean> = signal(false);
  protected consumptionDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionTableConfig(this.detail$()));
  protected errors$: WritableSignal<FormError[]> = signal([]);
  protected consumptionActions$: Signal<CardActionDefinition[]> = computed(() => this.getConsumptionActions(this.isAddingConsumption$()));

  private formGroup!: FormGroup;
  private selectedQuantity!: number;

  ngOnInit() {
    this.consumptionService.listByShelve(this.id);
  }


  public onActionClicked(data: CellActionDefinition): void {
    const item: Consumption = data.data! as Consumption;
    switch (data.action) {
      case ConsumptionAction.DELETE:
        this.handleDelete(item.id);
        break;
      case ConsumptionAction.DELIVERED:
        this.handleDeliver(item.id);
        break;

    }

  }


  private handleDelete(id: string): void {
    this.consumptionService.delete(id).pipe(tap(() => {
      this.stockService.list();

      this.isAddingConsumption$.set(false);
    })).subscribe();
  }

  private handleDeliver(id: string): void {

  }

  genFormConfigs(): FormConfig {

    let consumption: Consumption = this.consumptionUtils.getEmpty();
    return this.consumptionUtils.getDataFormConfig(this.consumptionUtils.getEmptyFormData()
      , 'feature.admin.consumption.title-add');
  }

  genConfig(shelve: Shelve): DataTableConfig {
    return this.productUtils.getShelveDetailDataConfig(shelve.products);
  }

  genConsumptionTableConfig(shelve: Shelve): DataTableConfig {
    return this.consumptionUtils.getDataTableConfig(flatten(shelve.products.map(p => p.consumptions)), true);
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve {
    if (stocks) {

      return this.shelveUtils.getShelveDetailFromStock(stocks, this.id);
    }
    this.stockService.list();
    return this.shelveUtils.getEmpty();

  }

  public consume(data: CellActionDefinition): void {
    this.productConsume$.set(data.data);
    this.selectedQuantity = 1;
    this.isAddingConsumption$.set(true);

  }

  onFormSubmitted(formValue: any): void {

    if (formValue.consumption_type === ConsumptionType.RESERVATION && formValue.delivery_date.length === 0) {
      this.errors$.set([{control: 'delivery_date', error: 'needed', value: true}])
      return;
    }
    const product: Product = this.productConsume$()!;
    const shelve: Shelve = this.shelveUtils.getShelveForProduct(this.stockService.list$()!, product);
    const consumption: Consumption = this.createConsumption(formValue, shelve, product);
    this.updateProductAndConsumption(product, consumption, shelve);
  }

  public setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message'
  })
  cancel(): void {
    this.isAddingConsumption$.set(false);
  }

  public actionCardClicked(action: CardActionDefinition): void {
    switch (action.action) {
      case FormAction.SAVE:
        this.onFormSubmitted(this.formGroup.value);
        break;
      case FormAction.CANCEL:
        this.cancel();
        break;
    }
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

  private createConsumption(formValue: ConsumptionForm, shelve: Shelve, product: Product): Consumption {
    console.log('product', product);
    const consumption: Consumption = {
      order_date: parse(formValue.order_date, 'dd-MM-yyyy', new Date()),
      order_date_str:'',
      delivery_date_str:'',
      quantity: this.selectedQuantity,
      is_reserved: formValue.consumption_type === "RESERVATION",
      is_delivered: formValue.consumption_type !== "RESERVATION",
      consumption_type: formValue.consumption_type,
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
      this.stockService.list();
    });
  }
}
