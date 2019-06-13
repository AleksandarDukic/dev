import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { VidService } from '../services/vid.service';
import { RecordService } from '../services/record.service';
import { VidData } from '../services/vid-data.model';
import {SelectItem} from 'primeng/api';
import { RecordData } from '../services/record-data.model';
import {DragDropModule} from 'primeng/dragdrop';
import {TableModule} from 'primeng/table';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ExcercisesData } from '../services/excercises-data.model';


@Component({
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})

export class SchedulingComponent implements OnInit, OnDestroy {
  selected: string; // bezveze al mora zbog liste
  selected1: string;
  selected2: string;
  pending: any [] = [];
  private pendingSub: Subscription;
  vids: VidData[] = [];
  selectedVids: ExcercisesData[] = [];
  note: string;
  record: RecordData;
  draggedVid: VidData;

  private vidsSub: Subscription;

  constructor(private authService: AuthService, private vidService: VidService, private recordService: RecordService) {}

  ngOnInit() {
    this.vidService.getVideos();
    this.authService.getPending();
    this.vidsSub = this.vidService.
      getVidsUpdatedListener()
        .subscribe((vidsData) => {
          this.vids = vidsData.vids;
          console.log(this.vids);
        });
    this.pendingSub = this.authService.
      getPendingUpdatedListener()
        .subscribe((userData) => {
          this.pending = userData.pending;
          console.log(this.pending);
        });

  }

    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    }


  onClick(userId: string, email: string) {
    alert(userId);
    this.selected1 = email;
    this.selected2 = userId;
  }

  send() {
    console.log(this.selectedVids);
    console.log(this.note);
    console.log(this.selected2);
    this.recordService.putRecord(this.selected2, this.note, this.selectedVids);
  }

  ngOnDestroy() {
    this.pendingSub.unsubscribe();
  }

}
