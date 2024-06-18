import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from './../../_service/shared.service';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.component.html',
  styleUrls: ['./doctor-listing.component.scss']
})
export class DoctorListingComponent implements OnInit {

  loading=false;
  acceptedDoctor :any = [];
  constructor(private shared: SharedService ,private http : HttpClient , private activeRoute : ActivatedRoute , private rout:Router ) {

   }

  ngOnInit(): void {
    this.loading=true;

    this.shared.get('admin/accepted-doctors').subscribe(res=>{
      this.acceptedDoctor = res.data
      this.loading=false;
    });
  }


}
