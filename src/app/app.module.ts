import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PostListComponent } from './posts/post-list.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionareComponent } from './questionare/questionare.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ExcercisesComponent } from './excercises/excercises.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AddvidComponent } from './addvid/addvid.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { CalendarModule } from 'primeng/calendar';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    PostListComponent,
    QuestionareComponent,
    ProfileComponent,
    CalendarComponent,
    ExcercisesComponent,
    AddvidComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CalendarModule,
    NgxYoutubePlayerModule.forRoot()      // od NGX
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);  /// Ovo je od NGX-a
