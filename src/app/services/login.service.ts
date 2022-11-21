import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest
} from '@azure/msal-browser';
import {filter} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class LoginService {
  private accountInfo: AccountInfo;

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  ) {
    this.onInit();
  }

  onInit() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        this.setAccountInfo(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(async () => this.initAccount());
  }

  initAccount() {
    const allAccounts = this.authService.instance.getAllAccounts();
    if (!this.accountInfo && allAccounts.length) {
      const account = allAccounts[0];
      this.authService.instance.setActiveAccount(account);
      this.setAccountInfo(account);
    }
  }

  setAccountInfo(activeAccount: AccountInfo) {
    this.accountInfo = activeAccount ?? this.accountInfo;
  }

  login() {
    try {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  }

  logout() {
    this.authService.logoutRedirect();
  }

  get fullName() {
    if (!this.loggedIn) {
      return null;
    }
    return this.account.name;
  }

  get nameInitials() {
    if (!this.loggedIn) {
      return null;
    }
    return this.account.name[0];
  }

  get loggedIn() {
    return !!this.account;
  }

  get account(): AccountInfo {
    return this.accountInfo;
  }

  get email(): string {
    return this.account.username;
  }

  get tokenClaims(): any {
    return this.account.idTokenClaims;
  }

  hasRole(expectedRole: string | string[]): boolean {
    if (!this.account || !this.tokenClaims['roles']) {
      return false;
    }
    const findingRoles = Array.isArray(expectedRole) ? expectedRole : [expectedRole];

    return findingRoles.some(role =>
        this.tokenClaims['roles'].includes(role)
      // ['Usuario'].includes(role)
    )
  }
}
