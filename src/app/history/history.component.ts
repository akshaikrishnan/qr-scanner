import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  scannedData: any;

  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('scannedData'))
      this.scannedData = localStorage.getItem('scannedData')?.split(',');
  }
}
