import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReplyComponent } from './question-reply.component';

describe('QuestionReplyComponent', () => {
  let component: QuestionReplyComponent;
  let fixture: ComponentFixture<QuestionReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
