import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecordData } from './record-data.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class RecordService {

  constructor(private http: HttpClient, private router: Router) {}

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
}
