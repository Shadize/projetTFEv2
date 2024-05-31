import { Component, OnInit, inject, Signal, computed } from "@angular/core";
import { Router } from "@angular/router";
import { SecurityService, CredentialUtilService, Credential } from "@security";
import { DataTableConfig, AppRoutes, CellActionDefinition, confirmDialog, DataTableComponent } from "@shared";
import { MemberAction } from "app/dashboard/feature/member/data/enum";
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
    const item : Credential = data.data! as Credential;
    switch (data.action) {
      case MemberAction.DETAIL:
        this.handleDetail();
        break;
      case MemberAction.EDIT:
        this.handleEdit(item.id);
        break;
      case MemberAction.DELETE:
        this.handleDelete(item.id);
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

  private handleEdit(id: string): void {
    this.router.navigate([AppRoutes.ADMIN_MEMBER_UPDATE.replace(':id',id)]).then();

  }

  @confirmDialog({
    title: 'admin-feature-member-delete.confirm-title',
    message: 'admin-feature-member-delete.confirm-message'
  })
  private handleDelete(id: string): void {
    this.securityService.delete(id);
    }
}
