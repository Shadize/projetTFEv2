import { Component, Input, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Credential, CredentialUtilService, SecurityService } from '@security';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { tap } from 'rxjs';
import {FormBuilderComponent} from '@shared';

@Component({
    selector: 'app-member-admin-update-page',
    standalone: true,
    templateUrl: './member-admin-update-page.component.html',
    styleUrl: './member-admin-update-page.component.scss',
    imports: [FormBuilderComponent]
})
export class MemberAdminUpdatePageComponent {
  @Input() id!: string;
  private credentialUtils: CredentialUtilService = inject(CredentialUtilService)
  protected securityService: SecurityService = inject(SecurityService)
  protected config$: Signal<FormConfig> = computed(() => this.genFormConfigs(this.detail$()));
  public detail$: WritableSignal<Credential | null> = signal(null);


  ngOnInit(): void {
    this.securityService.detail(this.id).pipe(
      tap((detail: Credential) => this.detail$.set(detail))
    ).subscribe()

    this.securityService.detail(this.id).pipe(
      tap((detail: Credential) => console.log(detail))
    ).subscribe()
  }

  genFormConfigs(credential: Credential | null): FormConfig {
    const detail = credential ?? this.credentialUtils.getEmpty();
    return this.credentialUtils.getDataFormConfig(detail);

  }

  onFormSubmitted(formValue: any): void {
    
    this.securityService.update(this.credentialUtils.genUpdatePayload({
      id:this.detail$()!.id,
      ...formValue
    })).subscribe();
    
  }
}
