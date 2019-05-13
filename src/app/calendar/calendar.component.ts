import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { AuthService } from '../services/auth.service';


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


  private isAuthenticatedSub: Subscription;
  private isInitiatedSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.isAuthenticated = this.authService.getIsAuth();
    this.isInitated = this.authService.getIsInitated();
    this.isAdmin = this.authService.getIsAdmin();

    this.isAuthenticatedSub = this.authService.getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }
}
