import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcommandesComponent } from './pcommandes.component';

describe('PcommandesComponent', () => {
  let component: PcommandesComponent;
  let fixture: ComponentFixture<PcommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcommandesComponent]
    });
    fixture = TestBed.createComponent(PcommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
