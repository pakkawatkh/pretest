import { errorResponse } from 'src/app/model/Response.model';
import { ContentModel } from './../../model/Content.model';
import { ApiService } from './../../services/api.service';
import { AddContentComponent } from './../add-content/add-content.component';
import { EditContentComponent } from './../edit-content/edit-content.component';
import { ContentDetailComponent } from './../content-detail/content-detail.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SweerAlertService } from 'src/app/services/sweer-alert.service';
@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  contents: ContentModel[] = new Array<ContentModel>();

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private alert: SweerAlertService
  ) { }

  ngOnInit(): void {
    this.loadContent()
  }

  loadContent() {
    this.api.authGet('/contents').subscribe((res: ContentModel[]) => {
      this.contents = res;
    });
  }

  openDetail(content: ContentModel) {
    this.dialog.open(ContentDetailComponent, {
      panelClass: 'custom-dialog-container',
      width: '100%',
      data: content,
      disableClose: true
    }
    ).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }

  openEdit(content: ContentModel) {
    this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '100%',
      data: content
    }).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }

  openAdd() {
    this.dialog.open(AddContentComponent).afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadContent();
      }
    });
  }
  onDelete(id: any) {
    this.alert.alert_comfirm('ยืนยันการลบข้อมูล').then((result) => {
      if (result.isConfirmed) {
        this.api.authDelete('/content?id=' + id).subscribe({
          next: (res: any) => {
            this.alert.alert_success(res.message);
            setTimeout(() => {
              this.loadContent();
            }, 2000);
          },
          error: (err:errorResponse) => {
            this.api.checkError(err);
          }
        });
      }
    })

  }



}
