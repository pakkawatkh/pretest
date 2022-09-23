import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TextEditerService } from './../../services/text-editer.service';
@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

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
