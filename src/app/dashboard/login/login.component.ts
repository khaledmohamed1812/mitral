import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SharedService } from './../../_service/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user = new User();
  show=false;
  isUserLoggedIn: boolean = false;
  constructor(private serv: SharedService , private rout:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.serv.post('auth/loginAdmin',this.user).subscribe(res=>{
      if(res.message=='تسجيل الدخول بنجاح'){
        localStorage.setItem('isAdminLoggedIn', "true" );
        localStorage.setItem('adminId', res.userId );
        localStorage.setItem('role', res.role );
        localStorage.setItem('token', res.token );
        this.toastr.success(res.message);
        this.rout.navigate(['/dashboard/home']);

      }else this.toastr.error(res.message);
    })
  }


}
