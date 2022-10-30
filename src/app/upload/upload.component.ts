import { Component, OnInit } from '@angular/core';
import { NgxScannerQrcodeService, SelectedFiles } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  public selectedFiles: SelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) {}
  public onSelects(files: any) {
    this.qrcode
      .toBase64(files, this.selectedFiles)
      .subscribe((res) => (this.selectedFiles = res));
  }
  ngOnInit(): void {}
}
