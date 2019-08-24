import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private isAuthenticatedListener = new Subject<boolean>();
  private isInitiatedListener = new Subject<boolean>();
  private isAdminListener = new Subject<boolean>();
  private isInitiated = false;
  private isAdmin = false;
  private userStats: StatsData;
  private statsUpdated = new Subject<{
    userStats: StatsData
  }>();
  private pending: { userId: string, email: string} [] = [];
  private pendingUpdated = new Subject<{
    pending: { userId: string, email: string} []
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getIsInitiatedListener() {
    return this.isInitiatedListener.asObservable();
  }

  getIsInitated() {
    return this.isInitiated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsAdminListener() {
    return this.isAdminListener.asObservable();
  }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticatedListener() {
    return this.isAuthenticatedListener.asObservable();
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
      .post<{ token: string, expiresIn: number, userId: string, pol: string, admin: boolean, pending: boolean, training: boolean }>(
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
          this.isAuthenticatedListener.next(true);
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000); // milisekunde
          console.log(expirationDate);
          console.log(token);
          this.saveAuthData(token, expirationDate, this.userId, response.admin, response.pending || false, response.training || false );
          if (response.pol === undefined) {
            this.isInitiated = false;
            this.isInitiatedListener.next(false);
            this.router.navigate(['/questionare']);
          } else {
            this.isInitiated = true;
            this.isInitiatedListener.next(true);
            if (response.admin === true) {
              this.isAdmin = true;
              this.isAdminListener.next(true);
            }
            this.router.navigate(['/']);
          }
        }
      }, error => {
        this.isAuthenticatedListener.next(false);
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
        work: work,
        pending: false,
        training: false
      };
    this.http
    .put(BACKEND_URL + this.userId, data)
    .subscribe( response => {
      this.isInitiated = true;
      this.isInitiatedListener.next(true);
      this.router.navigate(['/']);
    });
  }

  updateProfile(hurt, weight) {
    let data = {};
    if (weight === 0) {
      data = {
        hurt: hurt
      };
    } else {
      data = {
        hurt: hurt,
        weight: weight
      };
    }
    this.http
    .put(BACKEND_URL + this.userId, data)
    .subscribe ( response => {
      console.log(response);
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
      work: number,
      pending: boolean,
      training: boolean
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
    });
  }

  getPending() {
    return this.http
      .get<{
        message: string,
        users: any
      }>(
        BACKEND_URL + 'getpending'
      )
      .pipe(
        map((responseData) => {
          return {
            users: responseData.users.map(user => {
              return {
                userId: user._id,
                email: user.email
            };
            })
          };
        })
      )
      .subscribe(transfornedResponseData => {
        this.pending = transfornedResponseData.users;
        this.pendingUpdated.next({
          pending: [...this.pending]
        });
      });
  }

  getPendingUpdatedListener() {
    return this.pendingUpdated.asObservable();
  }


  /*.pipe(
    map((responseData) => {
      return {
        vids: responseData.vids.map(vid => {
          let mod = vid.type;
          switch (vid.type) {
            case 1: {
              mod = 'warmup';
              break;
            }
            case 2: {
              mod = 'core';
              break;
            }
            case 3: {
              mod = 'strech';
              break;
            }
          }
          return {
            name: vid.name,
            link: vid.link,
            note: vid.note,
            type: mod
          };
        })
      };
    })
  )
  .subscribe(transformedResponseData => {
    this.vids = transformedResponseData.vids;
    this.vidsUpdated.next({
      vids: [...this.vids]
    });
  });
}
*/

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
      this.isAuthenticatedListener.next(true);
      if (authInformation.admin === 'true') {
        this.isAdmin = true;
      }
    }
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.isAuthenticatedListener.next(false);
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

  private saveAuthData(token: string, expirationDate: Date, userId: string, admin: boolean, pending: boolean, training: boolean) {
    localStorage.setItem('token', token);                         // skladisti se na principu key-value pairs
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('admin', admin.toString());
    localStorage.setItem('pending', pending.toString());
    localStorage.setItem('training', training.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    localStorage.removeItem('pending');
    localStorage.removeItem('training');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const admin = localStorage.getItem('admin');
    const pending = localStorage.getItem('pending');
    const training = localStorage.getItem('training');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      admin: admin,
      pending: pending,
      training: training
    };
  }

}
