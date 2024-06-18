import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyResetComponent } from './successfully-reset.component';

describe('SuccessfullyResetComponent', () => {
  let component: SuccessfullyResetComponent;
  let fixture: ComponentFixture<SuccessfullyResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullyResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullyResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
