import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ScannerComponent } from './scanner/scanner.component';
import { HistoryComponent } from './history/history.component';

import { AngularFireModule } from '@angular/fire/compat';
import { PwaService } from './services/pwa.service';
import { UploadComponent } from './upload/upload.component';
import { AboutComponent } from './about/about.component';
const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt();
@NgModule({
  declarations: [AppComponent, ScannerComponent, HistoryComponent, UploadComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PwaService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
