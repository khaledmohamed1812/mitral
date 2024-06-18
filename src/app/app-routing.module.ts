import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  



  {path: "",component:HomeComponent},
  
  {path: "dashboard", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: "user", loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
