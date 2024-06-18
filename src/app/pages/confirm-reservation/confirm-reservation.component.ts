import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent implements OnInit {
  loading=false;
  doctorId:any;
  doctorInfo:any;
  appointment:any;

  patientName:any;
  mobile:any;
  email:any;
  date:any;
  time:any;
  online=false;
  reservationId:any;

  constructor(private shared:SharedService, private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    localStorage.getItem('type') == 'online' ? this.online= true : this.online=false;
    this.loading=true;
    this.doctorId=this.router.snapshot.params['doctorId'];
    this.reservationId=this.router.snapshot.params['reservationId'];
    this.patientName=localStorage.getItem('patientName');
    this.mobile=localStorage.getItem('mobile');
    this.email=localStorage.getItem('email');
    this.date=localStorage.getItem('date');
    this.time=localStorage.getItem('time');

    this.shared.get(`doctor/account/profile/${this.doctorId}`).subscribe(res=>{
      this.doctorInfo=res;
      this.appointment = this.doctorInfo['calender'].filter((el:any)=> el.weekday == localStorage.getItem('weekday') && el.startAt == localStorage.getItem('startAt'));
      this.loading=false;
    });
  }

  goToHome(){
    localStorage.removeItem('city');
    localStorage.removeItem('doctorName');
    localStorage.removeItem('region');
    localStorage.removeItem('specialty');
    localStorage.removeItem('patientName');
    localStorage.removeItem('mobile');
    localStorage.removeItem('email');
    localStorage.removeItem('date');
    localStorage.removeItem('time');
    localStorage.removeItem('startAt');
    localStorage.removeItem('weekday');
    localStorage.removeItem('type');
    this.route.navigate(['']);
  }
  PayOnline(){
    this.shared.get(`checkout-session/${this.reservationId}`).subscribe(res=>{
      window.location.href = res.session.url;
    });

  }

}
