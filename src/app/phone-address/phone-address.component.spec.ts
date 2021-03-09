import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAddressComponent } from './phone-address.component';

describe('PhoneAddressComponent', () => {
  let component: PhoneAddressComponent;
  let fixture: ComponentFixture<PhoneAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
