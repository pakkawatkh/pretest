import { AddContentComponent } from './../add-content/add-content.component';
import { EditContentComponent } from './../edit-content/edit-content.component';
import { ContentDetailComponent } from './../content-detail/content-detail.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  openDetail() {
    const dialogRef = this.dialog.open(ContentDetailComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEdit(id:any) {
    const dialogRef = this.dialog.open(EditContentComponent, {
      panelClass: 'custom-dialog-container',
      width: '100%',
      data: { id: id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddContentComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  contents = [1, 1, 1, 1, 1, 1]

  ngOnInit(): void {
  }

}
