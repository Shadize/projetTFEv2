import {Component, computed, inject, Input, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {tap} from 'rxjs';
import {Product} from '../../data';
import {Shelve, ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {ProductService, ProductUtilsService} from '../../service';
import {CardComponent, FormBuilderComponent} from '@shared';
import {Consumption, ConsumptionStatus, ConsumptionUtilsService} from '@consumption-feature';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SecurityService} from '@security';
import {JsonPipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {format, isAfter, parse} from 'date-fns';
import {ConsumptionType} from '../../../consumption/data/enum/consumption-type.enum';
import {ProductUpdatePayload} from '../../data/payload/product-update.payload';

@Component({
  selector: 'app-product-command',
  standalone: true,
  imports: [
    FormBuilderComponent,
    CardComponent,
    JsonPipe,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-command.component.html',
  styleUrl: './product-command.component.scss'
})
export class ProductCommandComponent implements OnInit {
  @Input() id!: string;

  private readonly securityService: SecurityService = inject(SecurityService);
  private readonly stockService: StockService = inject(StockService);
  private readonly stockUtils: StockUtilsService = inject(StockUtilsService);
  private readonly productService: ProductService = inject(ProductService);
  private readonly productUtils: ProductUtilsService = inject(ProductUtilsService);
  private readonly consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  private readonly shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  protected showMessage$: WritableSignal<boolean> = signal(false);
  protected todayStr$: WritableSignal<string> = signal(format(new Date(), 'yyyy-MM-dd'));
  protected detail$: WritableSignal<Product> = signal(this.productUtils.getEmpty());
  protected shelveDetail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$(), this.detail$()));
  protected formGroup!: FormGroup<any>;
  protected options: number[] = [];

  ngOnInit(): void {
    this.loadProductDetails();
  }

  public get qtyCtrl(): FormControl {
    return this.formGroup.get('qty')! as FormControl;
  }

  public get orderCtrl(): FormControl {
    return this.formGroup.get('order')! as FormControl;
  }

  public getNow(): void {
    const newConsumption = this.createConsumption();
    this.updateProductAndConsumption(this.detail$(), newConsumption, this.shelveDetail$());
  }

  private updateProductAndConsumption(product: Product, consumption: Consumption, shelve: Shelve): void {
    product.quantity -= consumption.quantity
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
          this.showMessage$.set(true);
          this.productService.detail(this.id).pipe(
            tap((detail: Product) => this.detail$.set(detail))
          ).subscribe();
        });
  }

  private createConsumption(): Consumption {
    const deliveryDate = parse(this.orderCtrl.value, 'yyyy-MM-dd', new Date());
    const is_reserved: boolean = isAfter(deliveryDate, new Date());
    const consumption: Consumption = {
      order_date: new Date(),
      order_date_str: '',
      delivery_date_str: '',
      quantity: this.qtyCtrl.value,
      is_reserved: is_reserved,
      is_delivered: !is_reserved,
      consumption_type: is_reserved ? ConsumptionType.RESERVATION : ConsumptionType.DIRECT_REMOVE,
      type: this.detail$().type,
      status: ConsumptionStatus.ACTIVE,
      shelve: this.shelveDetail$().str,
      shelve_reference: this.shelveDetail$().id,
      author: this.securityService.account$(),
      productName: `${this.detail$().title} ${this.detail$().str}`,
      id: '',
      str: '',
      isEmpty: false,
      delivery_date: deliveryDate
    };
    return consumption;
  }

  private loadProductDetails(): void {
    this.stockService.list();
    this.productService.detail(this.id).pipe(
      tap((detail: Product) => {
        const qty: number = detail.quantity > 0 ? 1 : 0;
        this.formGroup = new FormGroup<any>({
          qty: new FormControl(qty),
          order: new FormControl(format(new Date(), 'yyyy-MM-dd'))
        })
        this.options = Array.from({length: detail.quantity}, ((_, index: number) => index + 1));
        this.detail$.set(detail);
      })
    ).subscribe();
  }

  private getShelveDetail(stocks: Stock[] | undefined, product: Product | null): Shelve {
    if (!stocks) {
      this.stockService.list();
      return this.shelveUtils.getEmpty();
    }
    return this.shelveUtils.getShelveForProduct(stocks, product);
  }
}
