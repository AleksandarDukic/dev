import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecordData } from './record-data.model';
import { AuthData } from './auth-data.model';
import { ExcercisesData } from './excercises-data.model';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class RecordService {

  _id: string;
  date: Date;
  excercises: ExcercisesData[];
  note: string;
  recordUpdated = new Subject<{ _id: string, date: Date, excercises: ExcercisesData[], note: string }>();

  constructor(private http: HttpClient, private router: Router) {}

  getRecordUpdatedListener() {
    return this.recordUpdated.asObservable();
  }

  createRecord(date: Date, userId: string) {
    console.log(date, userId);

    const recordData = {
      userId: userId,
      date: date
    };
    return this.http
      .post(BACKEND_URL + '/record/create', recordData)
        .subscribe(() => {
          alert('Zakazali ste trening');
          localStorage.setItem('pending', 'true');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
        });
  }

  putRecord(_id: string, note: string, selectedVids: ExcercisesData[]) {

    const recordData = {
      _id: _id,
      note: note,
      selectedVids: selectedVids
    };

    return this.http
      .post(BACKEND_URL + '/record/put_training', recordData)
        .subscribe(() => {
          alert('Zakazali ste trening');
        }, error => {
          console.log("eeeeeeeeeeeee!!!");
        });
  }

  getRecord() {
    console.log("u get record!1");
    return this.http
      .get<{record: any}>(BACKEND_URL + '/record/get_training')
        .subscribe(response => {
          let Id = response.record._id;
          let userId = response.record.user_id;
          let date = response.record.date;
          let excercises = response.record.excercises;
          let note = response.record.note;

          this._id =Id
          this.date = date
          this.excercises = excercises;
          this.note = note;

          console.log("u get record!2");
          // console.log(Id);
          // console.log(userId);
          // console.log(date);
          // console.log(excercises);
          // console.log(note);
          console.log(this._id);
          console.log(this.date)
          console.log(this.note)
          console.log(this.excercises);
          this.recordUpdated.next({
            _id: this._id,
            date: this.date,
            excercises: this.excercises,
            note: this.note
          });
        });
  }
}
