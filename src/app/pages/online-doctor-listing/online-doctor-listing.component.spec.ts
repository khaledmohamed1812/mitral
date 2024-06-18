import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDoctorListingComponent } from './online-doctor-listing.component';

describe('OnlineDoctorListingComponent', () => {
  let component: OnlineDoctorListingComponent;
  let fixture: ComponentFixture<OnlineDoctorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineDoctorListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDoctorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
