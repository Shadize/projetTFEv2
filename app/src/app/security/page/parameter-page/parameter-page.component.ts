import {Component, OnInit, Signal, WritableSignal, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecurityService} from '../../service/security.service';
import {AppRoutes, CardActionDefinition, CardComponent, CardHeaderComponent, CellActionDefinition, DataTableComponent, DataTableConfig, LabelWithParamPipe} from '@shared';
import { ConsumptionUtilsService, ConsumptionService, Consumption } from '@consumption-feature';
import { Product } from '@product-feature';
import { MemberAction } from 'app/dashboard/feature/member/data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-parameter-page',
    standalone: true,
    templateUrl: './parameter-page.component.html',
    styleUrls: ['./parameter-page.component.scss'],
    imports: [CommonModule, CardComponent, CardHeaderComponent, LabelWithParamPipe, DataTableComponent]
})
export class ParameterPageComponent implements OnInit {

  private router: Router = inject(Router);
  readonly securityService:SecurityService = inject(SecurityService);
  protected actions$: WritableSignal<CardActionDefinition[]> = signal(this.getAction());


  ngOnInit(): void {
  }

  public actioncCliked(data: CardActionDefinition): void {
    switch(data.action){
      case MemberAction.LOGOUT:
        this.securityService.logOut();
        break;
      case MemberAction.EDIT:
        this.router.navigate([AppRoutes.ADMIN_MEMBER_UPDATE.replace(':id',data.data.id)]).then();
        break;
    }
  }

  private getAction(): CardActionDefinition[] {
    return [
      {
        icon: 'fa-pencil',
        action: MemberAction.EDIT
      },
      {
        icon: 'fa-arrow-up-left-from-circle',
        action: MemberAction.LOGOUT
      }
    ]
  }

}
