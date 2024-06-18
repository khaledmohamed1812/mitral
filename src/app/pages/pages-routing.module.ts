import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorReservationComponent } from './doctor-reservation/doctor-reservation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { OnlineDoctorListingComponent } from './online-doctor-listing/online-doctor-listing.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionReplyComponent } from './question-reply/question-reply.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SuccessfullyResetComponent } from './successfully-reset/successfully-reset.component';

 

const Pageroutes: Routes = [
 
  {path: "login", component: LoginComponent},  
  {path: "register", component: RegisterComponent},  
  {path: "reset-password", component: ResetPasswordComponent},

  {path: "forget-password", component: ForgetPasswordComponent},  
  {path: "successfully-reset-password", component: SuccessfullyResetComponent},  
  {path: "doctor-listing", component: DoctorListingComponent},  
  {path: "online-doctor-listing", component: OnlineDoctorListingComponent},  

  {path: "doctor-profile/:doctorId", component: DoctorProfileComponent},  
  {path: "doctor-reservation/:doctorId", component: DoctorReservationComponent},
  {path: "confirm-reservation/:doctorId/:reservationId", component: ConfirmReservationComponent},
  {path: "profile", component: ProfileComponent},
  {path: "my-reservation", component: MyReservationsComponent  },
  {path: "change-password", component: ChangePasswordComponent  },
  {path: "my-questions", component: MyQuestionsComponent  },
  {path: "question-reply/:questionId", component: QuestionReplyComponent  },


  









];



@NgModule({
  imports: [RouterModule, RouterModule.forChild(Pageroutes)],
exports: [RouterModule]
})
export class PagesRoutingModule { }
