import {
  Component,
  Input,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {ProductService, ProductUtilsService} from '../../service';
import {Product} from '../../data';
import {tap} from 'rxjs';
import {DetailCardConfig} from 'app/shared/ui/card/data/config/card-config';
import {
  CardComponent,
  CardHeaderComponent,
  CellActionDefinition,
  DataTableComponent,
  DataTableConfig,
  FormBuilderComponent,
} from '@shared';
import {DataCardComponent} from 'app/shared/ui/card/component/data-card/data-card.component';
import {FormConfig} from 'app/shared/ui/form/data';
import {
  Consumption,
  ConsumptionAction,
  ConsumptionService,
  ConsumptionStatus,
  ConsumptionUtilsService
} from '@consumption-feature';
import {flatten} from 'lodash';
import {ProductUpdatePayload} from '../../data/payload/product-update.payload';
import {Shelve, ShelveDto, ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {SecurityService} from '@security';

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
  ],
})
export class ProductDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected productService: ProductService = inject(ProductService);
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  protected consumptionService: ConsumptionService = inject(ConsumptionService);
  protected stockService: StockService = inject(StockService);
  protected stockUtils: StockUtilsService = inject(StockUtilsService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public securityService: SecurityService = inject(SecurityService);
  protected config$: Signal<DetailCardConfig> = computed(() => this.genCardConfigs(this.detail$()));
  public consumptionFormConfig$: Signal<FormConfig> = computed(() => this.genConsumptionFormConfigs());
  protected consumptionDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionTableConfig(this.detail$()!));
  public detail$: WritableSignal<Product> = signal(this.productUtils.getEmpty());
  public shelveDetail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public isAddingConsumption$: WritableSignal<boolean> = signal(false);
  public productConsume$: WritableSignal<Product | null> = signal(null);
  public productDataTableConfig: Signal<DataTableConfig> = computed(() => this.genProductConfig(this.detail$()!));

  selectedQuantity!: number;

  ngOnInit(): void {
    this.loadProductDetails();
  }

  private loadProductDetails(): void {
    this.stockService.list();
    this.productService.detail(this.id).pipe(
      tap((detail: Product) => this.detail$.set(detail))
    ).subscribe();
  }

  genCardConfigs(product: Product | null): DetailCardConfig {
    return this.productUtils.getDataCardConfig(product!);
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

  genProductConfig(product: Product): DataTableConfig {
    console.log('product', product);
    return this.productUtils.getOneProductDataConfig([product]);
  }

  genConsumptionTableConfig(product: Product): DataTableConfig {
    return this.consumptionUtils.getDataTableConfig(product.consumptions, true);
  }

  genConsumptionFormConfigs(): FormConfig {
    const consumption: Consumption = this.consumptionUtils.getEmpty();
    return this.consumptionUtils.getDataFormConfig(consumption, 'feature.admin.consumption.title-add');
  }

  cancel(): void {
    this.isAddingConsumption$.set(false);
  }

  private handleConsumptionDelete(id: string): void {
    this.consumptionService.delete(id).pipe(
      tap(() => this.isAddingConsumption$.set(false))
    ).subscribe();
  }

  private handleConsumptionDeliver(id: string): void {
    // Implementation here if needed
  }

  public consume(data: CellActionDefinition): void {
    const qty: number = data.data.config.formGroup[data.data.index].formGroup.get('quantity').value;
    this.productConsume$.set(data.data.item);
    this.selectedQuantity = qty;
    this.isAddingConsumption$.set(true);
  }

  onFormSubmitted(formValue: any): void {
    const shelveDto: ShelveDto = this.getShelveDto();
    const product: Product = this.productConsume$()!;
    const consumption: Consumption = this.createConsumption(formValue, shelveDto, product);
    this.updateProductAndConsumption(product, consumption, shelveDto);
  }

  private getShelveDto(): ShelveDto {
    const shelves = flatten(this.stockUtils.toDTOS(this.stockService.list$()!).map(s => s.shelves));
    return shelves.find(s => s.products.some(p => p.product_id === this.detail$()!.id)) ?? this.shelveUtils.toDTO(this.shelveUtils.getEmpty());
  }

  private createConsumption(formValue: any, shelveDto: ShelveDto, product: Product): Consumption {
    const shelve = this.shelveUtils.fromDTO(shelveDto);
    return {
      order_date: formValue.order_date,
      delivery_date: formValue.delivery_date,
      quantity: this.selectedQuantity,
      is_reserved: formValue.consumption_type === "RESERVATION",
      is_delivered: formValue.consumption_type !== "RESERVATION",
      consumption_type: formValue.consumption_type,
      type: formValue.type,
      status: ConsumptionStatus.ACTIVE,
      shelve: shelve.str,
      shelve_reference: shelve.id,
      author: this.securityService.account$(),
      productName: product.str,
      id: '',
      str: '',
      isEmpty: false
    };
  }

  private updateProductAndConsumption(product: Product, consumption: Consumption, shelveDto: ShelveDto): void {
    product.quantity -= this.selectedQuantity;
    product.consumptions.push(consumption);

    const productUpdatePayload: ProductUpdatePayload = this.productUtils.toUpdatePayload(
      product,
      this.stockUtils.toDTOS(this.stockService.list$()),
      shelveDto.shelve_id,
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

  getShelveDetail(stocks: Stock[] | undefined): Shelve {
    if (!stocks) {
      this.stockService.list();
      return this.shelveUtils.getEmpty();
    }
    const shelves = flatten(stocks.map(s => s.shelves));
    return shelves.find(s => s.id === this.id) ?? this.shelveUtils.getEmpty();
  }

}
