import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { Credential, CredentialUtilService, SecurityService } from '@security';
import { FormBuilderComponent } from '@shared';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';

@Component({
    selector: 'app-member-admin-add-page',
    standalone: true,
    templateUrl: './member-admin-add-page.component.html',
    styleUrl: './member-admin-add-page.component.scss',
    imports: [FormBuilderComponent]
})
export class MemberAdminAddPageComponent implements OnInit{
  private securityService : SecurityService = inject(SecurityService);
  private credentialUtils : CredentialUtilService = inject(CredentialUtilService)
  protected config$: Signal<FormConfig> = computed (() => this.genFormConfigs(this.securityService.list$()));

  ngOnInit(): void {
      this.securityService.list();
  }

  genFormConfigs(list : Credential[] | undefined): FormConfig {
    let credential: Credential = this.credentialUtils.getEmpty();

    return this.credentialUtils.getDataFormConfig(credential);
  }

  onFormSubmitted(formValue: any): void {

    this.securityService.create(this.credentialUtils.genCreatePayload({
      ...formValue
    })).subscribe();


  }
}
