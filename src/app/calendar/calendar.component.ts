import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RecordService } from '../services/record.service';


@Component({
  templateUrl: './calendar.component.html',
  styleUrls: [
  './calendar.component.css',
],

})

export class CalendarComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isInitated: boolean;
  isAdmin: boolean;

  public date: Date;
  private pending: boolean;
  private training: boolean;

  private isAuthenticatedSub: Subscription;
  private isInitiatedSub: Subscription;

  constructor(private authService: AuthService, private recordService: RecordService) {}

  ngOnInit() {

    this.isAuthenticated = this.authService.getIsAuth();
    this.isInitated = this.authService.getIsInitated();
    this.isAdmin = this.authService.getIsAdmin();

    this.isAuthenticatedSub = this.authService.getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

      const status = localStorage.getItem('pending');
      if (status === 'false') {
        this.pending = false;
      } else {
        this.pending = true;
        const status1 = localStorage.getItem('training');
        if (status1 === 'false') {
          this.training = false;
        } else {
          this. training = true;
        }
      }

  }
  setRecord() {
    const date1 = new Date(this.date.getTime() + 1000 * 3600 * 2);
    this.recordService.createRecord(date1, localStorage.getItem('userId'));
  }
  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }
}
