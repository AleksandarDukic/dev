import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.css']
})

export class QuestionareComponent {

  hurt = 0x00000;
  diss = 0x00000;

  filter1 = false;
  filter2 = false;

  filterData1() {
    this.filter1 = !this.filter1;
  }

  filterData2() {
    this.filter2 = !this.filter2;
  }

  constructor(public authService: AuthService) {}

  onInitiate(form: NgForm) {
    this.hurt = 0b00001 * form.value.neck + 0b00010 * form.value.shoulder + 0b00100 * form.value.leg;
    this.diss = 0b00001 * form.value.hemofylia + 0b00010 * form.value.hernia + 0b00100 * form.value.highpressure;
    this.authService.initiate(
      form.value.gender,
      form.value.weight,
      form.value.height,
      form.value.ever,
      form.value.mth,
      this.hurt,
      this.diss,
      this.filter1,
      this.filter2,
      form.value.work
    );
  }

}
