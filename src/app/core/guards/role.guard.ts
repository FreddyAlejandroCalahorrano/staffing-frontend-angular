import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {LoginService} from '@services/login.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    // if (!this.loginService.hasRole(expectedRole)) {
    if (false) {
      window.alert(
        'No tiene acceso porque falta el rol esperado. Aseg\u00FArese de que su cuenta est\u00E9 ' +
          'asignada a una funci\u00F3n de aplicaci\u00F3n y luego cierre la sesi\u00F3n y vuelva a ' +
          'iniciarla.',
      );
      return false;
    }
    return true;
  }
}
