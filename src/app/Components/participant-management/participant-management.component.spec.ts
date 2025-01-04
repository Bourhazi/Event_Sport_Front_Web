import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantManagementComponent } from './participant-management.component';

describe('ParticipantManagementComponent', () => {
  let component: ParticipantManagementComponent;
  let fixture: ComponentFixture<ParticipantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
