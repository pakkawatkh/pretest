import { CookiesService } from './cookies.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService implements CanActivate {

  constructor(
    private cookie: CookiesService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.cookie.helperToken()) {
      this.cookie.deleteToken();
      return true;
    }else{
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
