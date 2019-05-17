import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatsData } from './stats-data.model';
import { AuthData } from './auth-data.model';
import { VidData } from './vid-data.model';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/video/';

@Injectable({providedIn: 'root'})
export class VidService {

  private vids: VidData[] = [];
  private vidsUpdated = new Subject<{vids: VidData[]}>();


  constructor(private http: HttpClient, private router: Router) {}

  addVideo(name: string, link: string, note: string, type: string) {

    const vidData: VidData = { name: name, link: link, note: note, type: type };

    console.log(vidData.name, vidData.link, vidData.note, vidData.type);
    this.http
      .post<{message: string}>(
        BACKEND_URL + 'postVideo',
        vidData
      )
      .subscribe((responseData) => {
        // alert(responseData.message);
        this.router.navigate(['/']);
      });
  }

  getVideos() {
    this.http
      .get<{message: string, vids: any}>(
        BACKEND_URL + 'getVideos'
      )
      .pipe(
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

  getVidsUpdatedListener() {
    return this.vidsUpdated.asObservable();
  }




}
