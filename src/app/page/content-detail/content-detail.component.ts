import { ApiService } from './../../services/api.service';
import { ContentModel } from './../../model/Content.model';
import { EditContentComponent } from './../edit-content/edit-content.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  _isUpdate: boolean = false;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public content: ContentModel,
    public dialogRef: MatDialogRef<ContentDetailComponent>,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  openEdit() {
    this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '100%',
      data: this.content
    })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.loadContent()
          this._isUpdate = true;
        }
      });
  }

  loadContent() {
    this.api.authGet('/content?id=' + this.content.contentId).subscribe((res: ContentModel) => {
      this.content = res;
    })
  }

}
