import { SweerAlertService } from './../../../services/sweer-alert.service';
import { CookiesService } from './../../../services/cookies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({
    passwordOld: new FormControl(''),
    passwordNew: new FormControl(''),
    passwordConfirm: new FormControl('')
  });
  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private cookie: CookiesService,
    private alert: SweerAlertService

  ) {
    this.form = this.formBuilder.group({
      passwordOld: [
        '', Validators.required
      ],
      passwordNew: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });

  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.submitted = true;
    if (this.form.invalid) return;

    this.api.put('/user/changePassword', this.form.value).subscribe(
      {
        next: (res: any) => {
          this.cookie.setToken(res.token);
          this.alert.alert_success('เปลี่ยนรหัสผ่านสำเร็จ');
          setTimeout(() => {

            this.dialogRef.close(true);
          }, 2000);
        },
        error: (err: any) => {
          alert(err.error.message);
        }
      }
    );
  }
}
