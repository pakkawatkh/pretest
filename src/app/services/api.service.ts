import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookiesService } from './cookies.service';
import { errorResponse } from '../model/Response.model';
import { SweerAlertService } from './sweer-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private cookie: CookiesService,
    private router: Router,
    private alert: SweerAlertService
  ) { }

  _apiUrl: string = environment.apiUrl;

  headers(): any {
    const exp = this.cookie.helperToken();
    if (exp) {
      this.cookie.deleteToken();
      this.router.navigate(['/login']);
      this.alert.alert_error('ไม่มีสิทธิ์เข้าถึงข้อมูล');
      return;
    }
    return {
      headers: { Authorization: `Bearer ${this.cookie.getToken()}` },
    };

  }

  public authGet(url: string) {
    return this.http.get<any>(`${this._apiUrl}/auth${url}`)
  }

  public authPost(url: string, data: any) {
    return this.http.post<any>(`${this._apiUrl}/auth${url}`, data)
  }

  public authPut(url: string, data: any) {
    return this.http.put<any>(`${this._apiUrl}/auth${url}`, data)
  }

  public authDelete(url: string) {
    return this.http.delete<any>(`${this._apiUrl}/auth${url}`)
  }

  public get(url: string) {
    return this.http.get<any>(`${this._apiUrl}${url}`, this.headers())
  }

  public post(url: string, data: any) {
    return this.http.post<any>(`${this._apiUrl}${url}`, data, this.headers())
  }

  public put(url: string, data: any) {

    return this.http.put<any>(`${this._apiUrl}${url}`, data, this.headers())
  }

  public delete(url: string) {
    return this.http.delete<any>(`${this._apiUrl}${url}`, this.headers())
  }

  public checkError(err: errorResponse) {
    switch (err.status) {
      case 400:
        err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ไม่พบข้อมูล');
        break;

      case 404:
        err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ข้อมูลไม่ถูกต้อง');
        break;

      case 403:
        err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('ไม่มีสิทธิ์เข้าถึงข้อมูล');
        setTimeout(() => {
          this.router.navigate(['/login']);

        }, 2000);
        break;

      case 500:
        err.error.message ? this.alert.alert_error(err.error.message) : this.alert.alert_error('เกิดข้อผิดพลาดในระบบ');
        break;

      default: this.alert.alert_error('เกิดข้อผิดพลาดในระบบ');
        break;
    }
  }
}
