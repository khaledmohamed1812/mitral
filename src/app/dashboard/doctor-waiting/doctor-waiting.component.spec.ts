import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWaitingComponent } from './doctor-waiting.component';

describe('DoctorWaitingComponent', () => {
  let component: DoctorWaitingComponent;
  let fixture: ComponentFixture<DoctorWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
