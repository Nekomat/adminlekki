import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCommandeComponent } from './answer-commande.component';

describe('AnswerCommandeComponent', () => {
  let component: AnswerCommandeComponent;
  let fixture: ComponentFixture<AnswerCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswerCommandeComponent]
    });
    fixture = TestBed.createComponent(AnswerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
