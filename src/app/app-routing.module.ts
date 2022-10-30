import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  { path: 'scan', component: ScannerComponent },

  { path: 'history', component: HistoryComponent },
  { path: '', redirectTo: '/scan', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
