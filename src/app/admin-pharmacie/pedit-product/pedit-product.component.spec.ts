import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeditProductComponent } from './pedit-product.component';

describe('PeditProductComponent', () => {
  let component: PeditProductComponent;
  let fixture: ComponentFixture<PeditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeditProductComponent]
    });
    fixture = TestBed.createComponent(PeditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
