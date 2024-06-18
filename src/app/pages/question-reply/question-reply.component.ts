import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/_service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-reply',
  templateUrl: './question-reply.component.html',
  styleUrls: ['./question-reply.component.scss']
})
export class QuestionReplyComponent implements OnInit {
  loading=false;
  postId:any;
  post:any;
  userId:any;
  closeResult: string = '';
  title:any;
  content:any;

  constructor(private shared:SharedService,private router:ActivatedRoute,public modalService: NgbModal,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userId=localStorage.getItem('userId');
    this.loadData();
  }

  loadData(){
    this.loading=true;
    this.postId=this.router.snapshot.params['questionId'];
    this.shared.get(`posts/post/${this.postId}`).subscribe(res=>{
      this.post=res.post;
      this.title=this.post.title;
      this.content=this.post.content;
      console.log(this.post.comments)
      this.loading=false;
    });
  }
  onEditPost(){
    this.loading=true;
    let obj={
      "title":this.title,
      "content":this.content 
    }
    this.shared.patch(`posts/post/${this.post._id}`,obj).subscribe(res=>{
      this.toastr.success(res.message);
      this.modalService.dismissAll();
      this.loadData();
    })
  }

 
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
