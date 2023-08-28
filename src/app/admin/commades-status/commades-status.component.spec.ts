import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommadesStatusComponent } from './commades-status.component';

describe('CommadesStatusComponent', () => {
  let component: CommadesStatusComponent;
  let fixture: ComponentFixture<CommadesStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommadesStatusComponent]
    });
    fixture = TestBed.createComponent(CommadesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
