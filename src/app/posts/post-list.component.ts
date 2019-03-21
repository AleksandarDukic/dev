import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {

  userIsAuthenticated = false;
  userIsInitated = false;

  private authStatusSub: Subscription;
  private initiatedStatusSub: Subscription;

  constructor(private authService: AuthService) {}

ngOnInit() {
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.userIsInitated = this.authService.getIsInitated();

  this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  if (!this.userIsInitated && this.userIsAuthenticated) {
    alert('you are not initiated');
  }


}






}
