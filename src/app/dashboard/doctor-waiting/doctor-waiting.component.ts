import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-doctor-waiting',
  templateUrl: './doctor-waiting.component.html',
  styleUrls: ['./doctor-waiting.component.scss']
})
export class DoctorWaitingComponent implements OnInit {
  loading=false;
  unVerifyedDoctor:any = [] ;
  
  constructor(private shared: SharedService , private activeRoute : ActivatedRoute , private rout:Router ,private toastr:ToastrService) {

   }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.loading=true;

    this.shared.get('admin/verfy-doctors').subscribe(res=>{
      this.unVerifyedDoctor = res.data
      this.loading=false;
    });
  }

  acceptOrReject(id:any,confirm:boolean){
    this.loading=true;
    this.shared.post('admin/verfy-doctors',{"userId":id,"confirm":confirm}).subscribe(res=>{
      this.toastr.success(res.message);
      this.loadData();
    });

  }


}
