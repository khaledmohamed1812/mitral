import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isUserLoggedIn = false
  toggledropdown=false;
  subscription: Subscription;
  constructor(private route :Router,private shared:SharedService) {
    this.subscription = this.shared.subscribeOnDeleteAccount().subscribe(res => {
      this.isUserLoggedIn=false;
    });
   }

;

  ngOnInit() {
    let storeData = localStorage.getItem("isUserLoggedIn");

    if( storeData != null && storeData == "true")
      this.isUserLoggedIn = true;
    else
      this.isUserLoggedIn = false;
 }

 logout(): void {
    this.isUserLoggedIn = false;
    localStorage.clear();
    this.route.navigate([''])

  }

}
