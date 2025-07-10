import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TabService {
  private selectedTabSubject = new BehaviorSubject<string>('create');
  selectedTab$ = this.selectedTabSubject.asObservable();

  setTab(tab: string) {
    this.selectedTabSubject.next(tab);
  }
}
