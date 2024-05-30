import {Component, computed, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockDetailComponent, StockService} from '@shelve-feature';
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
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { ProductUtilsService } from 'app/dashboard/feature/product/service';
import { Consumption, ConsumptionAction, ConsumptionKey, ConsumptionUtilsService } from '@consumption-feature';
import { ConsumptionService } from 'app/dashboard/feature/consumption/service/consumption.service';

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
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected consumptionUtils : ConsumptionUtilsService = inject(ConsumptionUtilsService);
  protected consumptionService : ConsumptionService = inject(ConsumptionService);
  public detail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public productDataTableConfig: Signal<DataTableConfig> = computed(() => this.genConfig(this.detail$()));
  public consumptionFormConfig$: Signal<FormConfig> = computed(() => this.genFormConfigs());
  public isAddingConsumption$: WritableSignal<boolean> = signal(false);
  protected consumptionDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionTableConfig(this.consumptionService.list$()));


  selectedQuantity! : number;
  ngOnInit() {
    this.consumptionService.listByShelve(this.id);
  }


  public onActionClicked(data: CellActionDefinition): void {
    const item : Consumption = data.data! as Consumption;
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
    this.consumptionService.delete(id);
  }

  private handleDeliver(id: string): void {

  }
  genFormConfigs() : FormConfig{

    let consumption: Consumption = this.consumptionUtils.getEmpty();
    return this.consumptionUtils.getDataFormConfig(consumption, 'feature.admin.consumption.title-add');
  }

  genConfig(shelve: Shelve): DataTableConfig {
    return this.productUtils.getShelveDetailDataConfig(shelve.products);
  }

  genConsumptionTableConfig(consumptions : Consumption[]) : DataTableConfig{
    return this.consumptionUtils.getDataTableConfig(consumptions, true);
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
    console.log(qty);
    console.log(data.data.config.formGroup[data.data.index].formGroup);
    this.selectedQuantity = qty;
    this.isAddingConsumption$.set(true);

  }

  onFormSubmitted(formValue: any): void{
    console.log(this.consumptionUtils.genCreatePayload({...formValue}, this.selectedQuantity, this.detail$()));
    this.consumptionService.create(this.consumptionUtils.genCreatePayload({...formValue}, this.selectedQuantity, this.detail$())).subscribe();
  }

  cancel(): void {
    this.isAddingConsumption$.set(false);
  }
}
