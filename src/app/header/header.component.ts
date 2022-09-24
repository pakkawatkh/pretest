import { SweerAlertService } from 'src/app/services/sweer-alert.service';
import { Router } from '@angular/router';
import { CookiesService } from './../services/cookies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: boolean = false;
  constructor(
    private cookie: CookiesService,
    private router: Router,
    private alert: SweerAlertService
  ) { }

  ngOnInit(): void { }

  logOut() {
    this.alert.alert_comfirm('คุณต้องการออกจากระบบใช่หรือไม่').then((res) => {
      if (res.isConfirmed) {
        this.cookie.deleteToken();
        this.router.navigate(['/home']);
      }
    })
  }

  ngDoCheck() {
    this.login = this.cookie.helperToken() ? false : true;
  }
}
