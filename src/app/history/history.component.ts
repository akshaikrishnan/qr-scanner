import { transition, trigger, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [
    trigger('deleteAnim', [
      transition(':leave', [
        animate(
          200,
          style({
            opacity: 0,
            height: 0,
            marginBottom: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class HistoryComponent implements OnInit {
  scannedData: any;

  constructor() {}
  delete(i: number) {
    this.scannedData.splice(i, 1);
    localStorage.setItem('scannedData', this.scannedData);
  }
  ngOnInit(): void {
    if (localStorage.getItem('scannedData'))
      this.scannedData = localStorage
        .getItem('scannedData')
        ?.split(',')
        .filter((n) => n);
    console.log(this.scannedData);
  }
}
