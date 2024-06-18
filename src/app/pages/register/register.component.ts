import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();
  show = false;
  showConfirm = false;

  constructor(private serv: SharedService , private rout:Router) { }

  ngOnInit(): void {
  }
  Register(){
    this.serv.post('auth/signupUser',this.user).subscribe(res=>{
      console.log(res)
      this.rout.navigate(['user/login']);

    });
  }

}
