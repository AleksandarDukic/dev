import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './questionare.component.html',
  styleUrls: ['./questionare.component.css']
})

export class QuestionareComponent {

  hurt = 0x00000;
  diss = 0x00000;

  constructor(public authService: AuthService) {}

  onInitiate(form: NgForm) {
    this.hurt = 0x00001 * form.value.neck + 0x00010 * form.value.shoulder + 0x00100 * form.value.leg;
    this.diss = 0x00001 * form.value.hemofylia + 0x00010 * form.value.hernia + 0x00100 * form.value.highpressure;
    this.authService.initiate(
      form.value.gender,
      form.value.weight,
      form.value.height,
      form.value.ever,
      form.value.mth,
      this.hurt,
      this.diss,
      form.value.smoker,
      form.value.alch,
      form.value.work
    );
  }

}
