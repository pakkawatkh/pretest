import { SweerAlertService } from './../../services/sweer-alert.service';
import { Router } from '@angular/router';
import { CookiesService } from './../../services/cookies.service';
import { ApiService } from './../../services/api.service';
import { UserModel, LoginResponse } from './../../model/User.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../providers/CustomValidators';
import { errorResponse } from 'src/app/model/Response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(private formBuilder: FormBuilder, private api: ApiService, private cookie: CookiesService,private router:Router,
    private alert : SweerAlertService
    ) {

    this.form = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      nickName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
        ],
      ],
    }
      ,
      {
        validators: [CustomValidators.mustMatch('password', 'confirmPassword')],
      });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const user = new UserModel();

    user.userName = this.form.value.userName;
    user.password = this.form.value.password;
    user.email = this.form.value.email;
    user.nickName = this.form.value.nickName;


    this.api.authPost('/register', user).subscribe(
      {
        next: (res: LoginResponse) => {
          this.cookie.setToken(res.token);
          this.alert.alert_success('สมัครสมาชิกสำเร็จ');
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
