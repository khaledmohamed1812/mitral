import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  loading=false;
  reservations:any=[]  
  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.shared.get('allReservations').subscribe(res=>{
      this.reservations=res.allReservations;
      console.log(this.reservations[0])
    })
  }
  goToMeeting(urlMeeting : any){
    window.location.href = urlMeeting;


  }

}
