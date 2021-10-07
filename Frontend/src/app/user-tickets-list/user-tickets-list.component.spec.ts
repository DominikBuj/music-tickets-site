import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketsListComponent } from './user-tickets-list.component';

describe('UserTicketsListComponent', () => {
  let component: UserTicketsListComponent;
  let fixture: ComponentFixture<UserTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
