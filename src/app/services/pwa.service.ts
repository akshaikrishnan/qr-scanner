import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
// import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;
  installModal = new Subject<any>();

  constructor() {}

  public initPwaPrompt() {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      this.openPromptComponent();
    });
  }

  private openPromptComponent() {
    timer(3000).subscribe(() => this.installModal.next(this.promptEvent));
  }
}
