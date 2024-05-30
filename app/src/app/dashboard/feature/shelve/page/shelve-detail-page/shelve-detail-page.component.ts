import {Component, computed, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {
  Shelve,
  ShelveUtilsService,
  Stock,
  StockDetailComponent,
  StockService,
  StockUtilsService
} from '@shelve-feature';
import {
  CardComponent,
  CardHeaderComponent, CellActionDefinition,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent,
  FormBuilderComponent
} from '@shared';
import {flatten} from 'lodash';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {ProductService, ProductUtilsService} from 'app/dashboard/feature/product/service';
import {
  Consumption,
  ConsumptionAction,
  ConsumptionKey,
  ConsumptionStatus,
  ConsumptionUtilsService
} from '@consumption-feature';
import {ConsumptionService} from 'app/dashboard/feature/consumption/service/consumption.service';
import {Product} from '@product-feature';
import {SecurityService} from '@security';
import {ProductUpdatePayload} from '../../../product/data/payload/product-update.payload';
import {tap} from 'rxjs';

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


  selectedQuantity!: number;

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
    return this.consumptionUtils.getDataFormConfig(consumption, 'feature.admin.consumption.title-add');
  }

  genConfig(shelve: Shelve): DataTableConfig {
    return this.productUtils.getShelveDetailDataConfig(shelve.products);
  }

  genConsumptionTableConfig(shelve: Shelve): DataTableConfig {
    return this.consumptionUtils.getDataTableConfig(flatten(shelve.products.map(p => p.consumptions)), true);
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve {
    if (stocks) {
      const shelves = flatten(stocks.map(s => s.shelves));
      return shelves.find(s => s.id === this.id) ?? this.shelveUtils.getEmpty();
    }
    this.stockService.list();
    return this.shelveUtils.getEmpty();

  }

  public consume(data: CellActionDefinition): void {
    const qty: number = data.data.config.formGroup[data.data.index].formGroup.get('quantity').value;
    this.productConsume$.set(data.data.item);
    this.selectedQuantity = qty;
    this.isAddingConsumption$.set(true);

  }

  onFormSubmitted(formValue: any): void {
    const product: Product = this.productConsume$()!;
    const comsumption: Consumption = {
      order_date: formValue.order_date,
      delivery_date: formValue.delivery_date,
      quantity: this.selectedQuantity,
      is_reserved: formValue.consumption_type === "RESERVATION" ? true : false,
      is_delivered: formValue.consumption_type === "RESERVATION" ? false : true,
      type: formValue.type,
      status: ConsumptionStatus.ACTIVE,
      shelve: this.detail$().str,
      shelve_reference: this.detail$().locationReference,
      author: this.securityService.account$(),
      productName: this.productConsume$()!.str,
      id: '',
      str: '',
      isEmpty: false
    }
    product.quantity = product.quantity - this.selectedQuantity;
    product.consumptions = product.consumptions.concat(comsumption);
    console.log(product);
    const productUpdatePayload: ProductUpdatePayload = this.productUtils.toUpdatePayload(product,
      this.stockUtils.toDTOS(this.stockService.list$()), this.detail$().id,
      this.consumptionUtils.toDTOS(product.consumptions))
    this.productService.update(productUpdatePayload, false)
      .pipe(tap(() => {
        this.stockService.list();

        this.isAddingConsumption$.set(false);
      })).subscribe();
  }

  cancel(): void {
    this.isAddingConsumption$.set(false);
  }
}
