import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StatsData } from '../services/stats-data.model';
import { RecordService } from '../services/record.service';
import { ExcercisesData } from '../services/excercises-data.model';

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

  private recordSub: Subscription;
  record_id: string;
  vids: ExcercisesData[];
  date: Date;
  note: string;
  comment: string;
  quality: number;

  private isAuthenticatedSub: Subscription;
  private isInitiatedSub: Subscription;
  private statsSub: Subscription;

  constructor(private authService: AuthService, private recordService: RecordService, private http: HttpClient) {}

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

  qualityPick(number: number) {
    this.quality = number;
    console.log(this.quality);
  }

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

    this.authService.getProfile();


    this.statsUpdatedSub = this.authService.getStatsUpdatedListener()
    .subscribe((userData: {userStats: StatsData}) => {
      this.gender = userData.userStats.gender;
      this.weight = userData.userStats.weight;
      this.height = userData.userStats.height;
      this.ever = userData.userStats.ever;
      this.mth = userData.userStats.mth;
      this.hurt = userData.userStats.hurt;
      this.diss = userData.userStats.diss;
      this.alch = userData.userStats.alch;
      this.smoke = userData.userStats.smoke;
      this.work = userData.userStats.work;
      if (localStorage.getItem('training') === 'true') {
      this.recordService.getRecord();
      this.recordSub = this.recordService.getRecordUpdatedListener()
        .subscribe((response: {_id: string, date: Date, excercises: ExcercisesData [], note: string}) => {
          this.record_id = response._id;
          this.date = response.date;
          this.vids = response.excercises;
          this.note = response.note;

        });
      }
    });

  }

  ngOnDestroy() {
    this.statsUpdatedSub.unsubscribe();
    this.recordSub.unsubscribe();
  }

}

