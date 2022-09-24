import { SweerAlertService } from './../../../services/sweer-alert.service';
import { errorResponse } from 'src/app/model/Response.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from './../../../model/User.model';
import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    nickName: new FormControl(''),
    email: new FormControl('')
  });
  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public profile: UserModel,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private formBuilder: FormBuilder,
    private alert: SweerAlertService

  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nickName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
        ],
      ],
    });

    if (profile) {
      this.form.patchValue({
        nickName: profile.nickName,
        email: profile.email
      })
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.put('/user/update', this.form.value).subscribe(
      {
        next: (res: any) => {
          this.alert.alert_success('แก้ไขข้อมูลสำเร็จ');
          setTimeout(() => {
            this.dialogRef.close(true);
          }, 2000);
        },
        error: (err: errorResponse) => {
          this.api.checkError(err);
        }
      }
    );
  }
}
