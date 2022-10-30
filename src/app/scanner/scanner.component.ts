import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxScannerQrcodeService, SelectedFiles } from 'ngx-scanner-qrcode';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  public textConfig: Object = {
    backgroundColor: 'green',
    color: 'white',
  };
  modal = false;
  source$: any;
  scanObservable = new Subject<any>();
  scannedData: any;
  url = '';
  public config: Object = {
    isAuto: true,
    text: { font: '25px serif' }, // Hiden { font: '0px' },
    frame: { lineWidth: 8 },
    medias: {
      audio: false,
      video: {
        facingMode: 'environment', // To require the rear camera https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
        frameRate: { ideal: 24 },

        style: {
          borderRadius: '30px',
        },
      },
    },
  };

  public selectedFiles: SelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) {}

  public onError(e: any): void {
    alert(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(
      (res: any) => console.log(fn + ': ' + res),
      (error: any) => console.error(fn + ': ' + error)
    );
  }
  public onSuccess(action: any) {
    this.modal = true;
    // console.log(action.data);
    this.scanObservable.next(action.data._value);

    if (this.validURL(action.data._value)) {
      this.url = action.data._value;
    }
  }

  writeLocalData(data: any) {
    console.log(this.scannedData);
    this.scannedData.push(data);
    localStorage.setItem('scannedData', this.scannedData.toString());
  }

  public onSelects(files: any) {
    this.qrcode
      .toBase64(files, this.selectedFiles)
      .subscribe((res) => (this.selectedFiles = res));
  }
  validURL(str: any) {
    // console.log(str.startsWith('http') || str.startsWith('upi'));
    return str.startsWith('http') || str.startsWith('upi');
  }
  ngOnInit(): void {
    if (localStorage.getItem('scannedData'))
      this.scannedData = new Array(
        localStorage.getItem('scannedData')?.split(',')
      );
    this.scanObservable
      .pipe(distinctUntilChanged())
      .subscribe((data: any) => this.writeLocalData(data));
  }
}
