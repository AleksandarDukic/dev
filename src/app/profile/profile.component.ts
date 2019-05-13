import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StatsData } from '../services/stats-data.model';

const BACKEND_URL = environment.apiUrl + '/user';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isInitated: boolean;
  isAdmin: boolean;
  private statsUpdatedSub: Subscription;

  gender: string;
  weight: number;
  height: number;
  ever: boolean;
  mth: boolean;
  hurt: number;
  diss: number;
  alch: boolean;
  smoke: boolean;
  work: number;

  private isAuthenticatedSub: Subscription;
  private isInitiatedSub: Subscription;
  private statsSub: Subscription;

  constructor(private authService: AuthService, private http: HttpClient) {}

  private ili(value: boolean) {
    if (value) {
      return 'jeste';
    } else {
      return 'niste';
    }
  }

  private bol(value: number) {
    let bol: string;
    if (!value) {
      bol = 'nemate bolova';
    } else {
      bol = 'imate bolova u ';
      if (value & 4) {
        bol = bol + 'nozi, ';
      }
      if (value & 2) {
        bol = bol + 'ramenu, ';
      }
      if (value & 1){
        bol = bol + 'vratu';
      }
    }
    return bol;
  }

  private teg(value: number) {
    let bol: string;
    if (!value) {
      bol = 'nemate zdrvstvenih tegoba';
    } else {
      bol = 'imate bolujete od ';
      if (value & 4) {
        bol = bol + 'visokog pritiska, ';
      }
      if (value & 2) {
        bol = bol + 'hernije, ';
      }
      if (value & 1) {
        bol = bol + 'hemofilije';
      }
    }
    return bol;
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.isInitated = this.authService.getIsInitated();
    this.isAdmin = this.authService.getIsAdmin();

    this.isAuthenticatedSub = this.authService.getIsAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });

    this.authService.getProfile();

    this.statsUpdatedSub = this.authService.getStatsUpdatedListener()
    .subscribe((userData: {userStats: StatsData}) => {
      this.gender = userData.userStats.gender,
      this.weight = userData.userStats.weight,
      this.height = userData.userStats.height,
      this.ever = userData.userStats.ever,
      this.mth = userData.userStats.mth,
      this.hurt = userData.userStats.hurt,
      this.diss = userData.userStats.diss,
      this.alch = userData.userStats.alch,
      this.smoke = userData.userStats.smoke,
      this.work = userData.userStats.work
    });

  }

  ngOnDestroy() {
    this.statsUpdatedSub.unsubscribe();
  }

}

