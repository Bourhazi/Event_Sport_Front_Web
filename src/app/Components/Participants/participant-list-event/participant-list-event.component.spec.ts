import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListEventComponent } from './participant-list-event.component';

describe('ParticipantListEventComponent', () => {
  let component: ParticipantListEventComponent;
  let fixture: ComponentFixture<ParticipantListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantListEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
