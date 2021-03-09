import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhoneAddressComponent } from './edit-phone-address.component';

describe('EditPhoneAddressComponent', () => {
  let component: EditPhoneAddressComponent;
  let fixture: ComponentFixture<EditPhoneAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhoneAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhoneAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
