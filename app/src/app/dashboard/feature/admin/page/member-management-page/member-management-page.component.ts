import { Component, OnInit, inject, Signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { SecurityService, CredentialUtilService, Credential } from "@security";
import { DataTableConfig, AppRoutes, CellActionDefinition } from "@shared";
import { MemberAction } from "app/dashboard/feature/member/data/enum";
import { DataTableComponent } from "../../../../../shared/ui/data-viewer/component/data-table/data-table.component";
import { TranslateModule } from "@ngx-translate/core";


@Component({
    selector: 'app-member-management-page',
    standalone: true,
    templateUrl: './member-management-page.component.html',
    styleUrl: './member-management-page.component.scss',
    imports: [
      DataTableComponent,
      TranslateModule
    ]
})
export class MemberManagementPageComponent implements OnInit {

  private router: Router = inject(Router);
  private securityService: SecurityService = inject(SecurityService);
  private credentialUtils: CredentialUtilService = inject(CredentialUtilService);
  protected config$: Signal<DataTableConfig> = computed(() => this.genConfigs(this.securityService.list$()));


  ngOnInit(): void {
      this.securityService.list();

  }


  addItem() {
    this.router.navigate([AppRoutes.ADMIN_MEMBER_CREATE]).then();
    }


  public onActionClicked(data: CellActionDefinition): void {
    switch (data.action) {
      case MemberAction.DETAIL:
        this.handleDetail();
        break;
      case MemberAction.EDIT:
        this.handleEdit();
        break;
      case MemberAction.DELETE:
        this.handleDelete();
        break;

    }
  
  }

  public onRowClicked(data: any): void {
    console.log('onRowClicked', data);
  }


  private genConfigs(credentials: Credential[]): DataTableConfig {
    return this.credentialUtils.getDataTableConfig(credentials, true);
  }


  private handleDetail(): void {
    console.log('show detail');
  }

  private handleEdit(): void {
    console.log('edit item');
  }

  private handleDelete(): void {
    console.log('handle delete');
  }
}
