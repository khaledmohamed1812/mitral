import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/_service/shared.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
})
export class DoctorProfileComponent implements OnInit {
  loading = false;
  doctorId: any;
  doctorInfo: any;
  calendarObj: {} = {};
  keys: any = [];
  values: any = [];
  showTime = false;
  dayClickedIndex: any;
  timeClickedIndex: any;
  weekDay: string = '';
  startAt: string = '';
  closeResult: string = '';
  comment = '';
  complaint='';
  rate: number = 0;
  userId: any;
  userName: any;
  type:string='';

  constructor(
    private shared: SharedService,
    private router: ActivatedRoute,
    private route: Router,
    public modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.type=localStorage.getItem('type')!;
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.shared
        .get(`user/account/profile/${this.userId}`)
        .subscribe((res) => {
          console.log(res);
          this.userName = res.userName;
        });
    }
    this.doctorId = this.router.snapshot.params['doctorId'];
    this.shared
      .get(`doctor/account/profile/${this.doctorId}`)
      .subscribe((res) => {
        this.doctorInfo = res;
        let days: string[] = [];
        if(this.type=='offline'){
          for (const el of res.calender) {
            if (days.length == 0) {
              days.push(el.weekday);
            } else {
              let existInDays = false;
              for (const day of days) {
                if (el.weekday == day) {
                  existInDays = true;
                }
              }
              if (existInDays) {
              } else {
                days.push(el.weekday);
              }
            }
          }
          type calender = {
            [key: string]: [];
          };
  
          const obj: calender = days.reduce((accumulator, value) => {
            return { ...accumulator, [value]: [] };
          }, {});
  
          for (const el of res.calender) {
            for (const key in obj) {
              if (key == el.weekday) {
                let array: string[] = [];
                array = obj[key];
                array.push(el.startAt);
              }
            }
          }
          this.calendarObj = obj;
          this.keys = Object.keys(this.calendarObj);
          this.values = Object.keys(obj).map(function (key) {
            return obj[key];
          });
          
        }else{
          for (const el of res.teleCalender) {
            if (days.length == 0) {
              days.push(el.weekday);
            } else {
              let existInDays = false;
              for (const day of days) {
                if (el.weekday == day) {
                  existInDays = true;
                }
              }
              if (existInDays) {
              } else {
                days.push(el.weekday);
              }
            }
          }
          type calender = {
            [key: string]: [];
          };
  
          const obj: calender = days.reduce((accumulator, value) => {
            return { ...accumulator, [value]: [] };
          }, {});
  
          for (const el of res.teleCalender) {
            for (const key in obj) {
              if (key == el.weekday) {
                let array: string[] = [];
                array = obj[key];
                array.push(el.startAt);
              }
            }
          }
          this.calendarObj = obj;
          this.keys = Object.keys(this.calendarObj);
          this.values = Object.keys(obj).map(function (key) {
            return obj[key];
          });


        }
      });
    this.loading = false;
  }
  selectedDay(day: string, i: number) {
    this.showTime = true;
    this.dayClickedIndex = i;
    this.weekDay = day;
    this.timeClickedIndex = undefined;
  }
  selectTime(time: string, i: number) {
    this.timeClickedIndex = i;
    this.startAt = time;
  }

  reserveNow(loginModal: any) {
    if (this.userId) {
      localStorage.setItem('weekday', this.weekDay);
      localStorage.setItem('startAt', this.startAt);
      this.route.navigate([`/user/doctor-reservation/${this.doctorId}`]);
    } else {
      this.open(loginModal);
    }
  }
  openModal(loginModal: any, reviewLogin: any) {
    if (this.userId) {
      this.open(reviewLogin);
    } else {
      this.open(loginModal);
    }
  }
  openComplaintModal(loginModal: any, compaintModal: any) {
    if (this.userId) {
      this.open(compaintModal);
    } else {
      this.open(loginModal);
    }
  }
  addReviewNumber(num: number) {
    this.rate = num;
  }
  addReview() {
    let obj = {
      name: this.userName,
      rating: this.rate,
      comment: this.comment,
    };
    this.shared.post(`doctor/${this.doctorId}/review`, obj).subscribe((res) => {
      if (res.reviewId) {
        this.toastr.success('تمت إضافة التقييم بنجاح');
        this.loadData();
      } else this.toastr.error(res.message);
      this.modalService.dismissAll();
    });
  }
  addComplaint(){
    this.shared.post(`doctor/complaints/${this.doctorId}`, { "details":this.complaint }).subscribe((res) => {
      this.toastr.success(res.message);
      this.modalService.dismissAll();
    });

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
