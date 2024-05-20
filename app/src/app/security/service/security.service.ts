import {computed, effect, EffectRef, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {ApiResponse, ApiService, ApiURI, TokenService} from '@api';
import {Credential, SignInPayload} from '@security';
import {Router} from '@angular/router';
import {AppNode} from '@shared';
import {CredentialUtilService} from './credential-util.service';
import {SignUpPayload} from '../data/payload/sign-up.payload';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly api: ApiService = inject(ApiService);
  private readonly tokenService: TokenService = inject(TokenService);
  isAuthenticated$: Signal<boolean> = computed(() => !this.tokenService.token$().isEmpty);
  private readonly credentialUtil: CredentialUtilService = inject(CredentialUtilService);
  account$: WritableSignal<Credential> = signal(this.credentialUtil.getEmpty());
  private readonly isAuthenticatedHandler: EffectRef = effect(() => this.handleAuthenticatedChange(this.isAuthenticated$()));
  private readonly router: Router = inject(Router);

  signIn(payload: SignInPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_IN, {...payload, socialLogin: false}).pipe(
      tap((response: ApiResponse) => {
        //if success then goToDashboard and save token
        if (response.result) {
          this.tokenService.setToken({...response.data, isEmpty: false});
        }
      })
    );
  }

  signUp(payload: SignUpPayload): Observable<ApiResponse> {
    return this.api.post(ApiURI.SIGN_UP, {...payload, socialLogin: false}).pipe(
      tap((response: ApiResponse) => {
        //if success then goToDashboard and save token
        if (response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
        }
      })
    );
  }

  logOut(): void {
    this.tokenService.setToken({token: '', refreshToken: '', isEmpty: true});
  }

  private handleAuthenticatedChange(isAuthenticated: boolean): void {
    this.api.get(ApiURI.ME)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.account$.set(this.credentialUtil.fromDTO(response.data));
          if (!window.location.pathname.startsWith('/' + AppNode.REDIRECT_TO_AUTHENTICATED)) {
            this.router.navigate([AppNode.REDIRECT_TO_AUTHENTICATED]).then();
          }
        } else {
          this.router.navigate([AppNode.REDIRECT_TO_PUBLIC]).then();
        }
      }))
      .subscribe();
  }


}
