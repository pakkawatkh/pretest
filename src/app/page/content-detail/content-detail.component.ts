import { EditContentComponent } from './../edit-content/edit-content.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  _isUpdate: boolean = false;
  contentId: number = 0;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openEdit() {
    this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '100%',
      data: { id: this.contentId }
    })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this._isUpdate = true;
        }
      });
  }

}
