import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {StorageService} from '@pichincha/angular-sdk/storage';
import {LoginService} from "@services/login.service";
import {environment} from "@environments/environment";

/**
 * Types
 */

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(
    private auth: MsalService,
    private router: Router,
    private storage: StorageService,
    private loginService: LoginService,) {
  }

  async canActivate(): Promise<boolean> {
    try {
      const tokenResponse = await this.auth.handleRedirectObservable().toPromise();
      if (!tokenResponse) {
        const accounts = this.auth.instance.getAllAccounts();
        const token = this.storage.get(environment.authProvider.accessTokenName);
        if (accounts.length === 0) {
          await this.auth.loginRedirect().toPromise();
          return false;
        }
        if (!token) {
          await this.auth.loginRedirect().toPromise();
          return false;
        }
        // this.router.navigate([environment.authProvider.redirectUrl]);
        return true;
      } else {
        this.storage.set(environment.authProvider.accessTokenName, tokenResponse.idToken);
        return true;
      }
    } catch (e) {
    }
    return false;
  }
}
