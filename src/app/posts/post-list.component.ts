import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {

  isAuthenticated = false;
  isInitated = false;
  isAdmin = false;

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

  if (!this.isInitated && this.isAuthenticated) {
    alert('you are not initiated');
  }


}






}
