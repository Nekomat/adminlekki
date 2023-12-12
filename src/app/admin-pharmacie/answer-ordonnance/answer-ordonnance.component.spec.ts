import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOrdonnanceComponent } from './answer-ordonnance.component';

describe('AnswerOrdonnanceComponent', () => {
  let component: AnswerOrdonnanceComponent;
  let fixture: ComponentFixture<AnswerOrdonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerOrdonnanceComponent]
    });
    fixture = TestBed.createComponent(AnswerOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
