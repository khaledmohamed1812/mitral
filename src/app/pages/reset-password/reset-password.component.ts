import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  user = new User();
  token = '';
  userId = 1;
  constructor(private serv: SharedService , private rout:Router,private activeRoute : ActivatedRoute ,) { }

  ngOnInit(): void {
    // this.token = this.activeRoute.snapshot.paramMap.get('token');
    // this.userId = this.activeRoute.snapshot.paramMap.get('userId');
    console.log(localStorage.getItem('user'))

  }
  updatePassword(){
    
    let body={
      "userId" : this.userId,
      "passwordToken" : this.token,
      "password" :this.user.password,
      "confirmPassword": this.user.confirmPassword
     }

    this.serv.post('auth/newpassword',body).subscribe(res=>{
      this.rout.navigate(['/user/successfully-reset-password']);
    });
  }

}
