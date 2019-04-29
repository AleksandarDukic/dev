import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  userIsAuthenticated: boolean;
  userIsInitated: boolean;
  userIsAdmin: boolean;

  private authStatusSub: Subscription;
  private initiatedStatusSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsInitated = this.authService.getIsInitated();
    this.userIsAdmin = this.authService.getIsAdmin();

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
