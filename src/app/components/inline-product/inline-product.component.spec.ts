import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineProductComponent } from './inline-product.component';

describe('InlineProductComponent', () => {
  let component: InlineProductComponent;
  let fixture: ComponentFixture<InlineProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
