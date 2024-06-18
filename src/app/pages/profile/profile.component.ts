import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading=false;
  userName:string='';
  email:string='';
  mobile:any;
  date:any;
  userId:any;
  initialDate=Date.now();
  closeResult: string = '';

  constructor(private shared:SharedService,private toastr:ToastrService,private modalService: NgbModal,private route:Router) { 
    
  }

  ngOnInit(): void {
    this.loading=true;
    this.userId=localStorage.getItem('userId')
    this.shared.get(`user/account/profile/${this.userId}`).subscribe(res=>{
      this.userName=res.userName;
      this.email=res.email;
      this.mobile=res.phone;
      this.date=res.birthDate;
      this.loading=false;
    });
  }
  editProfile(){
    this.loading=true;
    let obj={
      "userName":this.userName,
      "email":this.email,
      "phone":this.mobile,
      "birthDate":this.date
    }
    this.shared.put('user/account/profile',obj).subscribe({
      next:res=>{
        this.toastr.success(res.message);
        this.loading=false;
      },
      error:err=>{
        this.loading=false;
        this.toastr.error(err.error.data[0].msg);
      }
    });

  }
  deleteAccount(){
    this.loading=true;
    this.shared.delete('user/account/profile').subscribe(res=>{
      this.toastr.success(res.message);
      this.modalService.dismissAll();
      localStorage.clear();
      this.shared.deleteAccount();
      this.loading=false;
      this.route.navigate(['']);
    });
  }

  open(content: any) {
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
