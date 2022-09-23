import { Component, OnInit } from '@angular/core';
import { TextEditerService } from './../../services/text-editer.service';

import {
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

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    detail: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    public editer: TextEditerService
  ) {
    this.form = this.formBuilder.group({
      title: ["", Validators.required],
      detail: ["", Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    //todo : save to database
  }
}