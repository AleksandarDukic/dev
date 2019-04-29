import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatsData } from './stats-data.model';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({providedIn: 'root'})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private isInitiatedListener = new Subject<boolean>();
  private isInitiated = false;
  private isAdmin = false;
  private userStats: StatsData;
  private statsUpdated = new Subject<{
    userStats: StatsData
  }>();

  // gender: string;
  // weight: number;
  // height: number;
  // ever: boolean;
  // mth: boolean;
  // hurt: number;
  // diss: number;
  // alch: boolean;
  // smoke: boolean;
  // work: number;






  getIsInitiatedListener() {
    return this.isInitiatedListener.asObservable();
  }

  getIsInitated() {
    return this.isInitiated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getStatsUpdatedListener() {
    return this.statsUpdated.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http
      .post(BACKEND_URL + '/signup', authData)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number, userId: string, pol: string, admin: boolean }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000); // milisekunde
          console.log(expirationDate);
          console.log(token);
          this.saveAuthData(token, expirationDate, this.userId, response.admin );
          if (response.pol === undefined) {
            this.isInitiated = false;
            this.isInitiatedListener.next(false);
            this.router.navigate(['/questionare']);
          } else {
            this.isInitiated = true;
            this.isInitiatedListener.next(true);
            if (response.admin === true) {
              this.isAdmin = true;
            }
            this.router.navigate(['/']);
          }
        }
      }, error => {
        this.authStatusListener.next(false);
        console.log(error);
      });
  }

  initiate(
    gender: string,
    weight: number,
    height: number,
    ever: boolean,
    mth: boolean,
    hurt: number,
    diss: number,
    smoke: boolean,
    alch: boolean,
    work: number
    ) {
      const data = {
        gender: gender,
        weight: weight,
        height: height,
        ever: ever,
        mth: mth,
        hurt: hurt,
        diss: diss,
        smoke: smoke,
        alch: alch,
        work: work
      };
    this.http
    .put(BACKEND_URL + this.userId, data)
    .subscribe( response => {
      this.isInitiated = true;
      this.isInitiatedListener.next(true);
      this.router.navigate(['/']);
    });
  }

  getProfile() {
    return this.http
    .get<{
      gender: string,
      weight: number,
      height: number,
      ever: boolean,
      mth: boolean,
      hurt: number,
      diss: number,
      alch: boolean,
      smoke: boolean,
      work: number
    }>(
      BACKEND_URL + 'getuser'
    )
    .subscribe(response => {

      this.userStats = response;

      this.statsUpdated.next({
        userStats: this.userStats
      });
    }, error => {
      console.log(error);
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);      // authTimer radi sa sekundama pa delimo sa 1000
      this.authStatusListener.next(true);
      if (authInformation.admin === 'true') {
        this.isAdmin = true;
      }
    }
  }


  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.isAdmin = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting time: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, admin: boolean) {
    localStorage.setItem('token', token);                         // skladisti se na principu key-value pairs
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('admin', admin.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const admin = localStorage.getItem('admin');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      admin: admin
    };
  }

}
