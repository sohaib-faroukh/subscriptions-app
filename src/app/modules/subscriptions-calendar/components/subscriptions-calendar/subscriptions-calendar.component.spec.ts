import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsCalendarComponent } from './subscriptions-calendar.component';

describe('SubscriptionsCalendarComponent', () => {
  let component: SubscriptionsCalendarComponent;
  let fixture: ComponentFixture<SubscriptionsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
