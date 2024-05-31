import {Component, OnInit, Signal, WritableSignal, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecurityService} from '../../service/security.service';
import {CardComponent, CardHeaderComponent, CellActionDefinition, DataTableComponent, DataTableConfig, LabelWithParamPipe} from '@shared';
import { ConsumptionUtilsService, ConsumptionService, Consumption } from '@consumption-feature';
import { Product } from '@product-feature';

@Component({
    selector: 'app-parameter-page',
    standalone: true,
    templateUrl: './parameter-page.component.html',
    styleUrls: ['./parameter-page.component.scss'],
    imports: [CommonModule, CardComponent, CardHeaderComponent, LabelWithParamPipe, DataTableComponent]
})
export class ParameterPageComponent implements OnInit {

  readonly securityService:SecurityService = inject(SecurityService);
  protected consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService);
  protected consumptionService: ConsumptionService = inject(ConsumptionService);
  protected readonly Object = Object;
  protected readonly String = String;
  protected consumptionDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConsumptionTableConfig(this.consumptionService.list$()!));


  ngOnInit(): void {

    this.consumptionService.listByAuthor();
    // console.log(this.consumptionService.list$());
  }

  genConsumptionTableConfig(consumption: Consumption[]): DataTableConfig {
    return this.consumptionUtils.getDataTableConfig(consumption, true);
    


  }
onActionClicked($event: CellActionDefinition) {
  throw new Error('Method not implemented.');
  }

  test(){

  }
}
