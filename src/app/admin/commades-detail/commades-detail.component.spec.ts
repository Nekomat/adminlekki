import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommadesDetailComponent } from './commades-detail.component';

describe('CommadesDetailComponent', () => {
  let component: CommadesDetailComponent;
  let fixture: ComponentFixture<CommadesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommadesDetailComponent]
    });
    fixture = TestBed.createComponent(CommadesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
