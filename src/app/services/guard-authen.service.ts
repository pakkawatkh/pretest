import { CookiesService } from './cookies.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthenService implements CanActivate {

  constructor(
    private cookie: CookiesService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!this.cookie.helperToken()) {
      return true;
    } else {
      this.cookie.deleteToken();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
