import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { VidService } from '../services/vid.service';
import { RecordService } from '../services/record.service';
import { VidData } from '../services/vid-data.model';
import {SelectItem} from 'primeng/api';


@Component({
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})

export class SchedulingComponent implements OnInit, OnDestroy {
  selected: string; // bezveze al mora zbog liste
  selected1: string;
  pending: any [] = [];
  private pendingSub: Subscription;
  private vids: VidData[] = [];


  constructor(private authService: AuthService, private vidService: VidService, private recordService: RecordService) {}

  ngOnInit() {
    this.authService.getPending();
    this.pendingSub = this.authService.
      getPendingUpdatedListener()
        .subscribe((userData) => {
          this.pending = userData.pending;
          console.log(this.pending);
        });

  }
  onClick(userId: string, email: string) {
    alert(userId);
    this.selected1 = email;
  }
  ngOnDestroy() {
    this.pendingSub.unsubscribe();
  }

}
