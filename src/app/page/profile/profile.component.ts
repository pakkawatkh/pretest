import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  _isUpdate: boolean = false;
  contentId: number = 0;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openEdit() {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
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
