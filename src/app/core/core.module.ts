import {NgModule} from '@angular/core';

import {RoleGuard} from './guards/role.guard';
import {environment} from '@environments/environment';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication
} from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import {LoginService} from "@services/login.service";
import {LoggedGuard} from "./guards/logged.guard";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
const location = window.location.origin;// + environment.baseHref;

export function loggerCallback(logLevel: LogLevel, message: string) {
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.authProvider.clientId,
      authority: environment.authProvider.authority,
      redirectUri: location + environment.authProvider.redirectUrl,
      // navigateToLoginRequestUrl: true,
      // postLogoutRedirectUri: environment.authHref,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  /*
  protectedResourceMap.set(`${window.location.origin}${environment.api}`, [
    'email',
    'openid',
    'profile',
    'api://61d04daf-778c-4d6b-92de-d1eba0ac3274/default',
  ]);
  */
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [
        'email',
        'openid',
        'profile',
        // 'api://f5b0d682-1497-4db0-9019-660035554e72/default'
      ],
    },
    loginFailedRoute: environment.authProvider.redirectUrl,
  };
}

@NgModule({
  imports: [MsalModule],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },*/
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    RoleGuard,
    LoggedGuard,
    LoginService,
  ],
  bootstrap: [MsalRedirectComponent],
})
export class CoreModule {
}
