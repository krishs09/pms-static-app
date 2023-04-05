import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookappointmentsComponent } from './bookappointments.component';

describe('BookappointmentsComponent', () => {
  let component: BookappointmentsComponent;
  let fixture: ComponentFixture<BookappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookappointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
