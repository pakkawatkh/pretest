import { Router } from '@angular/router';
import { okResponse } from './../../model/Response.model';
import { errorResponse } from 'src/app/model/Response.model';
import { SweerAlertService } from 'src/app/services/sweer-alert.service';
import { ContentModel } from './../../model/Content.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextEditerService } from './../../services/text-editer.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  constructor(
    private formBuilder: FormBuilder,
    public editer: TextEditerService,
    @Inject(MAT_DIALOG_DATA) public content: ContentModel,
    public dialogRef: MatDialogRef<EditContentComponent>,
    private api: ApiService,
    private alert: SweerAlertService,
    private router:Router
  ) {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
        ],
      ],
      description: ["", Validators.required],
    });

    if (content) {
      this.form.patchValue({
        title: content.title,
        description: content.description
      })
    } else {
      alert.alert_error('ไม่พบข้อมูล');
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 2000);
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPut('/content?id=' + this.content.contentId, this.form.value).subscribe({
      next: (res: okResponse) => {
        this.alert.alert_success(res.message);
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
