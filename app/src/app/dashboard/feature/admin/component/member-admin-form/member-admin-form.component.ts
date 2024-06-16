import {
  Component,
  DestroyRef,
  Input,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Credential, CredentialUtilService, SecurityService } from '@security';
import {
  FormError,
  CardActionDefinition,
  FormConfig,
  handleFormError,
  AppRoutes,
  getFormValidationErrors,
  confirmDialog,
  CardComponent,
  FormBuilderComponent,
} from '@shared';
import { Observable, tap } from 'rxjs';
import { FormAction } from '../../data';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-member-admin-form',
  standalone: true,
  templateUrl: './member-admin-form.component.html',
  styleUrl: './member-admin-form.component.scss',
  imports: [CardComponent, FormBuilderComponent, TranslateModule],
})
export class MemberAdminFormComponent {
  @Input({ required: true }) user!: Credential;
  public formGroup?: FormGroup<any>;

  protected errors$: WritableSignal<FormError[]> = signal([]);
  protected actions$: Signal<CardActionDefinition[]> = computed(() =>
    this.getActions(this.user, this.errors$())
  );
  protected config$: Signal<FormConfig> = computed(() =>
    this.genFormConfigs(this.securityService.list$(), this.user)
  );
  private router: Router = inject(Router);
  private securityService: SecurityService = inject(SecurityService);
  private credentialUtils: CredentialUtilService = inject(
    CredentialUtilService
  );
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.securityService.list();
  }

  public setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
    handleFormError(this.formGroup, this.errors$, this.destroyRef);
  }

  public actionCardClicked(action: CardActionDefinition): void {
    switch (action.action) {
      case FormAction.SAVE:
        this.save();
        break;
      case FormAction.CANCEL:
        this.cancel();
        break;
      case FormAction.DELETE:
        this.delete();
        break;
    }
  }

  private genFormConfigs(
    list: Credential[] | undefined,
    user: Credential
  ): FormConfig {
    const config = this.credentialUtils.getDataFormConfig(
      user, 'feature.admin.member.title-add'
    );
    return config;
  }

  private getActions(
    user: Credential,
    errors: FormError[]
  ): CardActionDefinition[] {
    const actions: CardActionDefinition[] = [
      {
        icon: 'fa-regular fa-floppy-disk',
        action: FormAction.SAVE,
        isDisabled: false,
      },
      {
        icon: 'fa-regular fa-arrow-rotate-left',
        action: FormAction.CANCEL,
        isDisabled: false,
      },
    ];
    if (!user.isEmpty) {
      actions.push({
        icon: 'fa-regular fa-trash',
        action: FormAction.DELETE,
        isDisabled: false,
      });
    }
    return actions;
  }

  // Actions area
  private save(): void {
    if (this.formGroup?.valid && this.formGroup?.value) {
      let obs: Observable<Credential>;
      if (this.user.isEmpty) {
        obs = this.securityService.create(
          this.credentialUtils.genCreatePayload(this.formGroup?.value)
        );
      } else {
        obs = this.securityService.update(
          this.credentialUtils.genUpdatePayload({
            ...this.formGroup?.value,
            id: this.user.id,
          })
        );
      }
      obs
        .pipe(
          tap((user: Credential) => {
            if (!user.isEmpty) {
              this.router.navigate([AppRoutes.MEMBER_LIST]).then();
            }
          })
        )
        .subscribe();
    }
    if (this.formGroup?.invalid) {
      this.errors$.set(getFormValidationErrors(this.formGroup));
    }
  }

  @confirmDialog({
    title: 'common.cancel-form.confirm-title',
    message: 'common.cancel-form.confirm-message',
  })
  private cancel(): void {
    this.router.navigate([AppRoutes.MEMBER_LIST]).then();
  }

  @confirmDialog({
    title: 'common.delete-form.confirm-title',
    message: 'common.delete-form.confirm-message',
  })
  private delete(): void {
    this.router.navigate([AppRoutes.ADMIN_MEMBER]).then();
  }
}
