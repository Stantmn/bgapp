import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingRateComponent } from './shipping-rate.component';

describe('ShippingRateComponent', () => {
  let component: ShippingRateComponent;
  let fixture: ComponentFixture<ShippingRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
