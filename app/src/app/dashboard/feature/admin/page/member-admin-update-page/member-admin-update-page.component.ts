import { Component, Input, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Credential, CredentialUtilService, SecurityService } from '@security';
import { FormConfig } from 'app/shared/ui/form/data/config/form.config';
import { tap } from 'rxjs';

@Component({
  selector: 'app-member-admin-update-page',
  standalone: true,
  imports: [],
  templateUrl: './member-admin-update-page.component.html',
  styleUrl: './member-admin-update-page.component.scss'
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
  }

  genFormConfigs(product: Credential | null): FormConfig {
    const detail = product ?? this.credentialUtils.getEmpty();
    return this.credentialUtils.getDataFormConfig(detail);

  }

  onFormSubmitted(formValue: any): void {
    /*
    this.securityService.update(this.credentialUtils.genUpdatePayload({
      ...formValue
    }));
    */
  }
}
