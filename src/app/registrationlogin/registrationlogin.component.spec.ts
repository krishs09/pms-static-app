import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationloginComponent } from './registrationlogin.component';

describe('RegistrationloginComponent', () => {
  let component: RegistrationloginComponent;
  let fixture: ComponentFixture<RegistrationloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
