import { SweerAlertService } from './../../services/sweer-alert.service';
import { Router } from '@angular/router';
import { CookiesService } from './../../services/cookies.service';
import { LoginResponse } from './../../model/User.model';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { errorResponse } from 'src/app/model/Response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });
  submitted: boolean = false;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cookie: CookiesService,
    private router: Router,
    private alert : SweerAlertService

  ) {

    this.form = this.formBuilder.group({
      userName: [
        '',Validators.required,
      ],
      password: [
        '',Validators.required,
      ],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPost('/login', this.form.value).subscribe(
      {
        next: (res: LoginResponse) => {
          this.cookie.setToken(res.token);
          this.alert.alert_success('เข้าสู่ระบบสำเร็จ');
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 2000);

        },
        error: (err:errorResponse) => {
          this.api.checkError(err);
        }
      }
    )

  }
}
