import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  loading$ = this.loader.loading$;
  constructor(private loader: LoadingService) {}

  ngOnInit(): void {
  }

}
