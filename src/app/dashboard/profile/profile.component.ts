import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/_service/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  complaints:any=[];
  accounts:any;
  closeResult: string = '';



  constructor(
    private shared: SharedService,
    private route:Router,
    private router: ActivatedRoute,
    public modalService: NgbModal,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.doctorId = this.router.snapshot.params['id'];
    this.shared.get(`doctor/account/profile/${this.doctorId}`).subscribe(res => {
        this.doctorInfo = res;
        let days: string[] = [];
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

        this.shared.get(`admin/complaints/${this.doctorId}`).subscribe(res=>{
          this.complaints=res.complaints;
          this.shared.get(`admin/accounts/${this.doctorId}`).subscribe(res=>{
            this.accounts=res;
            this.loading = false;
          })

        })
    });
  }

  selectedDay(day: string, i: number) {
    this.showTime = true;
    this.dayClickedIndex = i;
    this.weekDay = day;
    this.timeClickedIndex = undefined;
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

  onBlockAccount(){
    this.shared.delete(`admin/deleteDoctor/${this.doctorId}`).subscribe(res=>{
      this.toastr.success('تم حظر الحساب');
      this.modalService.dismissAll();
      this.route.navigate(['/dashboard/doctors/doctor-listing']);
    })
  }


}
