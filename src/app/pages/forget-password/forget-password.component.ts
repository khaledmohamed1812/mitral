import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  user = new User();

  constructor( private serv: SharedService , private rout:Router) {
  }

  ngOnInit(): void {
  }
  forgetPassword(){
   

    this.serv.post('auth/reset',this.user.email).subscribe(res => {
     
        this.rout.navigate(['/user/login']);
      
     });

  }

}
