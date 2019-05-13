import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { VidService } from '../services/vid.service';

@Component({
  templateUrl: './addvid.component.html',
  styleUrls: ['./addvid.component.css']
})

export class AddvidComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isInitated: boolean;
  isAdmin: boolean;


  private isAuthenticatedSub: Subscription;
  private isInitatedSub: Subscription;

  constructor(private authService: AuthService, private vidService: VidService) {}

  ngOnInit() {

    this.isAuthenticated = this.authService.getIsAuth();
    this.isInitated = this.authService.getIsInitated();
    this.isAdmin = this.authService.getIsAdmin();

    this.isAuthenticatedSub = this.authService.getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
    });

  }

  onAdd(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.vidService.addVideo(form.value.name, form.value.link, form.value.note, form.value.tip);
    console.log(form.value.name, form.value.link, form.value.note, form.value.tip);
  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }
}
