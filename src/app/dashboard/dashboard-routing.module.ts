import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListingComponent } from './doctor-listing/doctor-listing.component';
import { DoctorOptionComponent } from './doctor-option/doctor-option.component';
import { DoctorWaitingComponent } from './doctor-waiting/doctor-waiting.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

 

const dashboardRoutes: Routes = [
 
  {path: "login", component: LoginComponent},  
  {path: "doctors/doctor-listing", component: DoctorListingComponent},  
  {path: "home", component: HomeComponent},  
  {path: "doctor-option", component: DoctorOptionComponent},  
  {path: "doctors/waiting-list", component: DoctorWaitingComponent}, 
  {path: "doctor/:id", component: ProfileComponent},  



];



@NgModule({
  imports: [RouterModule, RouterModule.forChild(dashboardRoutes)],
exports: [RouterModule]
})
export class DashboardRoutingModule { }
