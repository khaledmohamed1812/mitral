import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
  loading = false;
  specialty: string = '0';
  specialtyOfQuestion: string = '0';
  title:string='';
  content:string='';
  hasPosts=false;
  
  getUrl:string='posts/allPosts';

  posts:any=[];
  total:number=0;
  page :any = 1;
  take: number = 10;


  constructor(private shared:SharedService,private toastr : ToastrService,private route:Router) {}

  ngOnInit(): void {
    this.loadData(this.getUrl);
  }

  loadData(url:string){
    this.loading=true;
    this.shared.get(url).subscribe(res=>{
      if(res.posts){
        this.hasPosts=true;
        this.posts = res.posts;
        this.total=res.totalPosts;
      }else{
        this.hasPosts=false;
      }
      this.loading=false;
    })
  }
  selectSpecialty(){
    let url = this.getUrl;
    url += `?specialty=${this.specialty}`;
    this.loadData(url);
  }
  changePage(page: any) {
    this.page = page;
    let url = this.getUrl+'?page='+page+'&'
    this.loadData(url);
  }
  shareNow(){
    
    let body = {
      "title": this.title,
      "content":this.content,
      "specialty":this.specialtyOfQuestion
    }
    this.loading=true;
    this.shared.post('posts/createPost',body).subscribe({
      
      next:res=>{
        if(res.postId){
          this.toastr.success(res.message);
          this.loadData(this.getUrl);
          this.title='';
          this.content='';
          this.specialtyOfQuestion='0';     
        }
      },
      error: err=>{
        this.loading=false;
        console.log(this.title.length)
        if(this.title.length < 20){
          this.toastr.error('ملخص سؤالك يجب ان لا يقل عن 20 حرف');
             
        }
        else if(this.content.length < 30 || this.content.length >300){
          this.toastr.error('ادخل سؤالك بما لا يقل عن 50 ولا يزيد عن 300 حرف');        
        }

      }
    })


    

  }
  naviagteToReply(id:any){
    this.route.navigate(['/user/question-reply/',id])
  }

}
