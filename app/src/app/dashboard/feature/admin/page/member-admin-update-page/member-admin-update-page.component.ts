import {Component, Input, Signal, WritableSignal, computed, inject, signal, OnInit} from '@angular/core';
import {Credential, CredentialUtilService, SecurityService} from '@security';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {tap} from 'rxjs';
import {AppRoutes, FormBuilderComponent} from '@shared';
import {Router} from '@angular/router';

@Component({
  selector: 'app-member-admin-update-page',
  standalone: true,
  templateUrl: './member-admin-update-page.component.html',
  styleUrl: './member-admin-update-page.component.scss',
  imports: [FormBuilderComponent]
})
export class MemberAdminUpdatePageComponent implements OnInit {
  @Input() id!: string;
  private credentialUtils: CredentialUtilService = inject(CredentialUtilService);
  protected securityService: SecurityService = inject(SecurityService);
  private router: Router = inject(Router);
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


  cancel(): void {
    this.router.navigate([AppRoutes.ADMIN_MEMBER]).then();
  }

  genFormConfigs(credential: Credential | null): FormConfig {
    const detail = credential ?? this.credentialUtils.getEmpty();
    return this.credentialUtils.getDataFormConfig(detail, 'feature.admin.member.title-update');

  }

  onFormSubmitted(formValue: any): void {

    this.securityService.update(this.credentialUtils.genUpdatePayload({
      id: this.detail$()!.id,
      ...formValue
    })).subscribe();

  }
}
