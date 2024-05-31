import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { ConsumptionService, ConsumptionUtilsService } from '../../service';
import { Consumption, ConsumptionAction } from '../../data';
import { CardComponent, CellActionDefinition, DataTableComponent, DataTableConfig } from '@shared';

@Component({
    selector: 'app-consumption-list-page',
    standalone: true,
    templateUrl: './consumption-list-page.component.html',
    styleUrl: './consumption-list-page.component.scss',
    imports: [DataTableComponent, CardComponent]
})
export class ConsumptionListPageComponent implements OnInit{

  private consumptionService: ConsumptionService = inject(ConsumptionService);
  private consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  protected consumptionConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionConfigs(this.consumptionService.list$()));



  ngOnInit(): void {
    this.consumptionService.list();
  }


  public onActionClicked(data: CellActionDefinition): void {
    const item: Consumption = data.data! as Consumption;
    switch (data.action) {
      case ConsumptionAction.DELETE:
        this.handleDelete(item.id);
        break;
    }
  }

  public onConsumptionRowClicked(data: any): void {

  }

  private genConsumptionConfigs(consumptions: Consumption[] | undefined): DataTableConfig {

    return this.consumptionUtils.getDataTableConfig(consumptions ?? [], false);
  }


  private handleDelete(id:string): void {
    this.consumptionService.delete(id).subscribe();
  }



}
