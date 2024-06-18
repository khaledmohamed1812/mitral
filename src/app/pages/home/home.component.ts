import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  specialty: string = '0';
  city : string='0';
  region: string = '0';
  callDoctor =false;
  doctorName! :string;
  regions!: string[];
  
  constructor(private route : Router) { }

  ngOnInit(): void {
  }

  selectCity(){
    switch(this.city) {
      case 'القاهرة':
        this.regions=['مدينه نصر','مصر الجديده','المعادي','التجمع'];
        break;
      case 'بورسعيد':
        this.regions=['مدينه بورسعيد','بورفؤاد','حي الزهور','حي الشرق'];
        break;
      case 'السويس':
        this.regions=['مدينه السويس','حي الاربعين','حي الجناين','حي فيصل'];
        break;
      case 'الاسماعيليه':
        this.regions=['مدينيه الاسماعيليه','فايد','القنطره','التل الكبير'];
        break;
      default:
    }
  }

  searchReservationDoctor(str:string){
    switch(str) {
      case 'online':
        localStorage.setItem('specialty',this.specialty);
        this.route.navigate(['/user/online-doctor-listing']);
        
        break;
        case 'offline':
          localStorage.setItem('specialty',this.specialty);
          localStorage.setItem('city',this.city);
          localStorage.setItem('region',this.region);
          localStorage.setItem('doctorName',this.doctorName);
          this.route.navigate(['/user/doctor-listing']);
        break;
      
      default:
    }

  }
}
