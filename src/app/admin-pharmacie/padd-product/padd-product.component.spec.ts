import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddProductComponent } from './padd-product.component';

describe('PaddProductComponent', () => {
  let component: PaddProductComponent;
  let fixture: ComponentFixture<PaddProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaddProductComponent]
    });
    fixture = TestBed.createComponent(PaddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
