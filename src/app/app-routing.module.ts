import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionareComponent } from './questionare/questionare.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ExcercisesComponent } from './excercises/excercises.component';
import { AuthGuard } from './services/auth.guard';
import { InitGuard } from './services/init.guard';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questionare', component: QuestionareComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [InitGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [InitGuard] },
  { path: 'excercises', component: ExcercisesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, InitGuard]
})
export class AppRoutingModule { }
