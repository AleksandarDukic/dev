import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { VidService } from '../services/vid.service';
import { VidData } from '../services/vid-data.model';

@Component({
  templateUrl: './excercises.component.html',
  styleUrls: ['./excercises.component.css']
})

export class ExcercisesComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isInitated: boolean;
  isAdmin: boolean;

  private isAuthenticatedSub: Subscription;
  private isInitatedSub: Subscription;

  vids: VidData[] = [];
  private vidsSub: Subscription;

  constructor(private authService: AuthService, private vidService: VidService) {}

  player: YT.Player;
  id = '09JslnY7W_k';

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.isInitated = this.authService.getIsInitated();
    this.isAdmin = this.authService.getIsAdmin();

    this.isAuthenticatedSub = this.authService.getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    this.vidService.getVideos();
    this.vidsSub = this.vidService.
      getVidsUpdatedListener()
        .subscribe((vidData) => {
          this.vids = vidData.vids;
        });


  }

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
    this.vidsSub.unsubscribe();
  }
}
