import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/_service/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-doctor-reservation',
  templateUrl: './doctor-reservation.component.html',
  styleUrls: ['./doctor-reservation.component.scss']
})
export class DoctorReservationComponent implements OnInit {
  loading=false;
  doctorId:any;
  doctorInfo:any;
  appointment:any;

  startAtArr:any=[];
  endAtArr:any=[];
  startAtAmOrPm:any;
  endAtAmOrPm:any;

  patientName:any;
  mobile:any;
  email:any;
  type:string="";


  constructor(private shared:SharedService, private route:Router, private router:ActivatedRoute,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.type=localStorage.getItem('type')!;
    this.loading=true;
    this.doctorId=this.router.snapshot.params['doctorId'];
    this.shared.get(`doctor/account/profile/${this.doctorId}`).subscribe(res=>{
      this.doctorInfo=res;
      if(this.type=='offline'){
        this.appointment = this.doctorInfo['calender'].filter((el:any)=> el.weekday == localStorage.getItem('weekday') && el.startAt == localStorage.getItem('startAt'));
      }else{
        this.appointment = this.doctorInfo['teleCalender'].filter((el:any)=> el.weekday == localStorage.getItem('weekday') && el.startAt == localStorage.getItem('startAt'));
      }
      this.startAtArr = this.appointment[0].startAt.split(' ');
      this.endAtArr=this.appointment[0].endAt.split(' ');
      this.startAtAmOrPm = this.startAtArr[1] == 'am' ? 'صباحاً' : 'مساءاً';
      this.endAtAmOrPm = this.endAtArr[1] == 'am' ? 'صباحاً' : 'مساءاً';
      this.loading=false;
    });
  }
  numberOnly(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    let pattern =/^\d+$/;
    if (pattern.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlpha(event:any) {
    var inp = String.fromCharCode(event.keyCode);
    let pattern =/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s-_]*$/;

    if (pattern.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  reserveNow(){
    let obj;
    if(this.type=='offline'){
      obj ={
        "doctor":this.doctorId,
        "start": this.appointment[0].startAt,
        "name": this.patientName,
        "time": this.appointment[0].date,
        "phone": this.mobile
      }
    }else{
      obj ={
        "type":"online",
        "doctor":this.doctorId,
        "start": this.appointment[0].startAt,
        "name": this.patientName,
        "time": this.appointment[0].date,
        "phone": this.mobile
      }
    }
    localStorage.setItem('patientName',this.patientName);
    localStorage.setItem('mobile',this.mobile);
    if(this.email !=undefined){
      localStorage.setItem('email',this.email);
    }
    localStorage.setItem('date',this.appointment[0].date);
    localStorage.setItem('time',this.appointment[0].startAt);


    this.shared.post('createReservation',obj).subscribe(res=>{

      if(res.message=='تم حجز موعدك بنجاح'){
        this.toastr.success(res.message)
        this.route.navigate([`/user/confirm-reservation/${this.doctorId}/${res.id}`]);
      }
      else{ this.toastr.error(res.message)}
  
    })
  }
}
