import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private isAuthenticatedSub: Subscription;
  isInitiated = false;
  private isInitiatedSub: Subscription;
  isAdmin = false;
  private isAdminSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.isAuthenticatedSub = this.authService
      .getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    this.isInitiated = this.authService.getIsInitated();
    this.isInitiatedSub = this.authService
      .getIsInitiatedListener()
      .subscribe(isInitiated => {
        this.isInitiated = isInitiated;
      });
    this.isAdmin = this.authService.getIsAdmin();
    this.isAdminSub = this.authService
      .getIsAdminListener()
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
    this.isInitiatedSub.unsubscribe();
    this.isAdminSub.unsubscribe();
  }

}
