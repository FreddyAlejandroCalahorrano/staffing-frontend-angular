import {EStorageType} from '@pichincha/typescript-sdk';
import {PublicClientApplication} from '@azure/msal-browser';
import {environment} from "../../environments/environment";

/**
 * Configuration for storage in browser
 */
export const ConfigStorage = {storageType: EStorageType.SESSION, secretKey: environment.storage.key};
const _location = window.location.origin
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1
  || window.navigator.userAgent.indexOf('Trident/') > -1;

/**
 * Configuration for MSAL Auth
 */
export const AuthApplication = new PublicClientApplication({
  auth: {
    clientId: environment.authProvider.clientId,
    authority: environment.authProvider.authority,
    redirectUri: _location + environment.authProvider.redirectUrl,
    // knownAuthorities: [environment.authProvider.tenantName]
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: isIE
  }
})

