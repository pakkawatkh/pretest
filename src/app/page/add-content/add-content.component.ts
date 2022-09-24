import { errorResponse, okResponse } from './../../model/Response.model';
import { SweerAlertService } from './../../services/sweer-alert.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { TextEditerService } from './../../services/text-editer.service';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {
  submitted: boolean = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    public editer: TextEditerService,
    private api: ApiService,
    public dialogRef: MatDialogRef<AddContentComponent>,
    private alert: SweerAlertService
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
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.api.authPost('/content', this.form.value).subscribe({
      next: (res: okResponse) => {
        this.alert.alert_success(res.message);
        setTimeout(() => {
          
          this.dialogRef.close(true);
        }, 2000);
      },
      error: (err: errorResponse) => {
        this.api.checkError(err);
      }
    });
  }
}