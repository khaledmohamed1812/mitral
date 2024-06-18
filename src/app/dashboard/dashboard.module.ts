import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginComponent } from './login/login.component';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { DoctorOptionComponent } from './doctor-option/doctor-option.component';
import { DoctorWaitingComponent } from './doctor-waiting/doctor-waiting.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    DoctorListingComponent,
    NavComponent,
    HomeComponent,
    DoctorOptionComponent,
    DoctorWaitingComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule { }
