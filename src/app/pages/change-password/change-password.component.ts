import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassowrd:string='';
  newPassword:string='';
  confirmNewPassword:string='';
  notMatch=false;
  constructor(private shared:SharedService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  changePassword(){
    let obj={
      "password": this.newPassword,
      "confirmPassword":this.confirmNewPassword
    }
    this.shared.put('user/account/changePassword',obj).subscribe({
      next:res=>{
        this.toastr.success(res.message)
        this.newPassword='';
        this.confirmNewPassword='';
        this.oldPassowrd='';
        
      },
      error:err=>{
        this.toastr.error(err.error.message)
      }

    })

  }

 

}
