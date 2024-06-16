import {Component, OnInit, Signal, computed, inject} from '@angular/core';
import {Credential, CredentialUtilService, SecurityService} from '@security';
import {AppRoutes, CardComponent, FormBuilderComponent} from '@shared';
import {FormConfig} from 'app/shared/ui/form/data/config/form.config';
import {Router} from '@angular/router';
import { MemberAdminFormComponent } from "../../component/member-admin-form/member-admin-form.component";

@Component({
    selector: 'app-member-admin-add-page',
    standalone: true,
    templateUrl: './member-admin-add-page.component.html',
    styleUrl: './member-admin-add-page.component.scss',
    imports: [FormBuilderComponent, CardComponent, MemberAdminFormComponent]
})
export class MemberAdminAddPageComponent {
  protected credentialUtils: CredentialUtilService = inject(CredentialUtilService);

}
