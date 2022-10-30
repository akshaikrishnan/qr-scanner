import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { ScannerComponent } from './scanner/scanner.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'scan', component: ScannerComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'about', component: AboutComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/scan', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
