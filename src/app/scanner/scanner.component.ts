import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxScannerQrcodeService, SelectedFiles } from 'ngx-scanner-qrcode';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { PwaService } from '../services/pwa.service';

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
  pwaPrompt = false;
  pwaEvent: any;
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
        width: { ideal: 720, max: 1080 },
        height: { ideal: 440, max: 720 },
        frameRate: { ideal: 24 },

        style: {
          borderRadius: '30px',
        },
      },
    },
  };

  public selectedFiles: SelectedFiles[] = [];

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private pwa: PwaService
  ) {}

  public onError(e: any): void {
    alert(e);
  }
  installPWA() {
    if (this.pwaEvent != null) {
      this.pwaEvent.prompt();
    }
    this.pwaPrompt = false;
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
    this.pwa.installModal.subscribe((data: any) => {
      this.pwaPrompt = true;
      this.pwaEvent = data;
      console.log(data);
    });
    if (localStorage.getItem('scannedData'))
      this.scannedData = new Array(
        localStorage.getItem('scannedData')?.split(',')
      );
    this.scanObservable
      .pipe(distinctUntilChanged())
      .subscribe((data: any) => this.writeLocalData(data));
  }
}
