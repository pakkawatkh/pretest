import { errorResponse } from 'src/app/model/Response.model';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { User, UserModel } from 'src/app/model/User.model';
import { ChangePasswordComponent } from './change-password/change-password.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  contentId: number = 0;
  profile: UserModel = new UserModel();
  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.api.get('/user/profile').subscribe(
      {
        next: (res: any) => {
          this.profile = res;
        },
        error: (err: errorResponse) => {
          this.api.checkError(err);
        }
      }
    )
  }
  openEdit() {
    this.dialog.open(EditProfileComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%',
      data: this.profile
    })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.loadProfile();
        }
      });
  }

  openChangePAssword() {
    this.dialog.open(ChangePasswordComponent, {
      panelClass: 'custom-dialog-container',
      width: '50%'
    })
  }

}
