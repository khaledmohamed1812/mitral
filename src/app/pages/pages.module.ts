import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { SuccessfullyResetComponent } from './successfully-reset/successfully-reset.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { RouterModule } from '@angular/router';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorReservationComponent } from './doctor-reservation/doctor-reservation.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { QuestionReplyComponent } from './question-reply/question-reply.component';
import { OnlineDoctorListingComponent } from './online-doctor-listing/online-doctor-listing.component';





@NgModule({
  declarations: [
    RegisterComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    HomeComponent,
    SuccessfullyResetComponent,
    FooterComponent,
    NavComponent,
    DoctorListingComponent,
    DoctorProfileComponent,
    DoctorReservationComponent,
    ConfirmReservationComponent,
    ProfileComponent,
    MyQuestionsComponent,
    MyReservationsComponent,
    ChangePasswordComponent,
    SpinnerComponent,
    QuestionReplyComponent,
    OnlineDoctorListingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    RouterModule,
    NgxPaginationModule

  ]
})
export class PagesModule { }
