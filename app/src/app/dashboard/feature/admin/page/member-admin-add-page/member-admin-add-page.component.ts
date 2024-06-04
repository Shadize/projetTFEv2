import {Component, OnInit, Signal, computed, inject} from '@angular/core';
import {Credential, CredentialUtilService, SecurityService} from '@security';
import {AppRoutes, CardComponent, FormBuilderComponent} from '@shared';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {Router} from '@angular/router';

@Component({
    selector: 'app-member-admin-add-page',
    standalone: true,
    templateUrl: './member-admin-add-page.component.html',
    styleUrl: './member-admin-add-page.component.scss',
    imports: [FormBuilderComponent, CardComponent]
})
export class MemberAdminAddPageComponent implements OnInit {
  private securityService: SecurityService = inject(SecurityService);
  private credentialUtils: CredentialUtilService = inject(CredentialUtilService);
  private router: Router = inject(Router);
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.securityService.list$()));

  ngOnInit(): void {
    this.securityService.list();
  }

  genFormConfigs(list: Credential[] | undefined): FormConfig {
    let credential: Credential = this.credentialUtils.getEmpty();
    return this.credentialUtils.getDataFormConfig(credential, 'feature.admin.member.title-add');
  }

  cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_MEMBER]).then();
  }

  onFormSubmitted(formValue: any): void {

    this.securityService.create(this.credentialUtils.genCreatePayload({
      ...formValue
    })).subscribe();


  }
}
