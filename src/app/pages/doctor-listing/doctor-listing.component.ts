import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-listing',
  templateUrl: './doctor-listing.component.html',
  styleUrls: ['./doctor-listing.component.scss']
})
export class DoctorListingComponent implements OnInit {
  loading =true;
  specialty!: string ;
  city! : string;
  region!: string;
  doctorName! :string;
  regions!: string[];
  getUrl :string = 'home/doctor?'
  doctors : any=[];
  total : number =100;
  page :any = 1;
  take: number = 10;
  sortingBy='ترتيب حسب';
  gender='';
  price='';
  hasDoctor=false;
  title="";
  
  constructor(private shared:SharedService,private route:Router) { }
  ngOnInit(): void {
    this.specialty = localStorage.getItem('specialty')!;
    this.city = localStorage.getItem('city')!;
    this.selectCity();
    this.region = localStorage.getItem('region')!;
    this.doctorName = localStorage.getItem('doctorName')=='undefined' ? '' : localStorage.getItem('doctorName')!;

    if(this.city != '0'){
      this.getUrl += `city=${this.city}&`
    }
    if(this.specialty != '0'){
      this.getUrl += `specialty=${this.specialty}&`
    }
    if(this.region != '0'){
      this.getUrl += `region=${this.region}&`
    }
    if(this.doctorName != ''){
      this.getUrl += `userName=${this.doctorName}&`
    }
    this.loadData();
  }

  loadData(){
    this.title =localStorage.getItem('specialty')!;
    this.page=1;
    this.shared.get(this.getUrl).subscribe({
      next:res=>{
        this.doctors=res.doctors;
        this.total = res.totalDoc;
        this.hasDoctor=true;
        this.loading = false;
      },
      error: err=>{
        this.hasDoctor=false;
        this.loading = false;
      }
    });

  }
  changePage(page: any) {
    this.page = page;
    this.loading=true;
    let url = this.getUrl+'page='+page+'&'
    this.shared.get(url).subscribe({
      next:res=>{
        this.doctors=res.doctors;
        this.total = res.totalDoc;
        this.hasDoctor=true;
        this.loading = false;
      },
      error: err=>{
        this.hasDoctor=false;
        this.loading = false;
      }
    })

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
  sorting(sortText: string){
    this.sortingBy=sortText;
    let urlHasSort=this.getUrl.includes("sorts=");
    this.loading=true;
    switch(sortText) {
      case 'اعلى تقييمات':
        if(this.getUrl.includes("sorts=-price&")){
          urlHasSort ? this.getUrl = this.getUrl.replace('sorts=-price&', "sorts=-raiting&"): this.getUrl += `sorts=-raiting&`;
        }else{
       
          urlHasSort ? this.getUrl = this.getUrl.replace('sorts=price&', "sorts=-raiting&"): this.getUrl += `sorts=-raiting&`;
        }
        break;

      case 'الأعلى سعرا':
        if(this.getUrl.includes("sorts=-raiting&")){
          urlHasSort ? this.getUrl = this.getUrl.replace("sorts=-raiting&", "sorts=-price&"): this.getUrl += `sorts=-price&`;

        }else{
          urlHasSort ? this.getUrl = this.getUrl.replace('sorts=price&', "sorts=-price&"): this.getUrl += `sorts=-price&`;
        }

        break;
      case 'الأقل سعرا':
        if(this.getUrl.includes("sorts=-raiting&")){
          urlHasSort ? this.getUrl = this.getUrl.replace('sorts=-raiting&', "sorts=price&"): this.getUrl += `sorts=price&`;

        }else{
          urlHasSort ? this.getUrl = this.getUrl.replace('sorts=-price&', "sorts=price&"): this.getUrl += `sorts=price&`;
        }
        break;
      
      default:
    }
    this.loadData();
  }
  selectGender(e :any){
    this.loading=true;
    this.gender=e.target.value;
    let urlHasGender=this.getUrl.includes("gender=");
    if(this.gender=='male'){
      urlHasGender ? this.getUrl = this.getUrl.replace('gender=female&', "gender=male&"): this.getUrl += `gender=male&`;
    }else{
      urlHasGender ? this.getUrl = this.getUrl.replace('gender=male&', "gender=female&"): this.getUrl += `gender=female&`;
    }
    this.loadData();    
  }
  selectPrice(e :any){
    this.loading=true;
    this.price=e.target.value;
    let urlHasPrice=this.getUrl.includes("price[gte]=");
    switch(this.price) {
      case '20To50':
        if(this.getUrl.includes("price[gte]=50&price[lte]=100")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=50&price[lte]=100', "price[gte]=20&price[lte]=50"): this.getUrl += `price[gte]=20&price[lte]=50`;
        }if(this.getUrl.includes("price[gte]=100&price[lte]=500")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=100&price[lte]=500', "price[gte]=20&price[lte]=50"): this.getUrl += `price[gte]=20&price[lte]=50`;
        }
        else{
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=500&price[lte]=1000', "price[gte]=20&price[lte]=50"): this.getUrl += `price[gte]=20&price[lte]=50`;
        }
        break;
      case '50To100':
        if(this.getUrl.includes("price[gte]=20&price[lte]=50")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=20&price[lte]=50', "price[gte]=50&price[lte]=100"): this.getUrl += `price[gte]=50&price[lte]=100`;
        }if(this.getUrl.includes("price[gte]=100&price[lte]=500")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=100&price[lte]=500', "price[gte]=50&price[lte]=100"): this.getUrl += `price[gte]=50&price[lte]=100`;
        }
        else{
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=500&price[lte]=1000', "price[gte]=50&price[lte]=100"): this.getUrl += `price[gte]=50&price[lte]=100`;
        }
        break;
      case '100To500':
        if(this.getUrl.includes("price[gte]=20&price[lte]=50")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=20&price[lte]=50', "price[gte]=100&price[lte]=500"): this.getUrl += `price[gte]=100&price[lte]=500`;
        }if(this.getUrl.includes("price[gte]=50&price[lte]=100")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=50&price[lte]=100', "price[gte]=100&price[lte]=500"): this.getUrl += `price[gte]=100&price[lte]=500`;
        }
        else{
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=500&price[lte]=1000', "price[gte]=100&price[lte]=500"): this.getUrl += `price[gte]=100&price[lte]=500`;
        }
        break;
      case '500To1000':
        if(this.getUrl.includes("price[gte]=20&price[lte]=50")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=20&price[lte]=50', "price[gte]=500&price[lte]=1000"): this.getUrl += `price[gte]=500&price[lte]=1000`;
        }if(this.getUrl.includes("price[gte]=50&price[lte]=100")){
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=50&price[lte]=100', "price[gte]=500&price[lte]=1000"): this.getUrl += `price[gte]=500&price[lte]=1000`;
        }
        else{
          urlHasPrice ? this.getUrl = this.getUrl.replace('price[gte]=100&price[lte]=500', "price[gte]=500&price[lte]=1000"): this.getUrl += `price[gte]=500&price[lte]=1000`;
        }
        break;
      default:
    }
    this.loadData();
    
  }
  searchReservationDoctor(){
    this.loading=true;

    localStorage.removeItem('city');
    localStorage.removeItem('doctorName');
    localStorage.removeItem('region');
    localStorage.removeItem('specialty');

    this.getUrl='home/doctor?';
    if(this.city != '0'){
      this.getUrl += `city=${this.city}&`
    }
    if(this.specialty != '0'){
      this.getUrl += `specialty=${this.specialty}&`
    }
    if(this.region != '0'){
      this.getUrl += `region=${this.region}&`
    }
    if(this.doctorName != ''){
      this.getUrl += `userName=${this.doctorName}&`
    }
    localStorage.setItem('specialty',this.specialty);
    localStorage.setItem('city',this.city);
    localStorage.setItem('region',this.region);
    localStorage.setItem('doctorName',this.doctorName);
    this.loadData();
  }
  reserveNow(app:any){
    localStorage.setItem('type','offline');
    this.route.navigate([`/user/doctor-profile/${app.doctor}`]);
  }

}
