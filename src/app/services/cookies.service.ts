import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  token = "_ikfgeb";
  private _secretKey: string = 'kjjffsioi6sgve8dfjlp%2F';
  helper$ = new JwtHelperService();
  constructor(private cookie: CookieService,private router:Router) { }

  setToken(data: string): void { (this.cookie.set(this.token, this.encrypt(data))); }
  getToken(): string { return this.decrypt(this.cookie.get(this.token)); }
  deleteToken(): void {
     this.cookie.delete(this.token); 
    }
  checkToken(): boolean { return this.cookie.check(this.token); }


  //เข้ารหัสข้อมูล
  private encrypt = (data: string): string =>
    CryptoJS.AES.encrypt(data, this._secretKey).toString();
    
  //ถอดรหัสข้อมูล
  private decrypt = (data: string): string => {
    try {
      return CryptoJS.AES.decrypt(data, this._secretKey).toString(CryptoJS.enc.Utf8);

    } catch (error) {
      this.cookie.deleteAll();
      this.router.navigate(['']);
      throw new Error('clear cookie in browser');
    }
  }

  helperToken = (): boolean => this.helper$.isTokenExpired(this.getToken());

}
