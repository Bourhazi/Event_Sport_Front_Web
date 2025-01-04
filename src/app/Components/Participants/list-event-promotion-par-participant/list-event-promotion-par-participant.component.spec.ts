import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEventPromotionParParticipantComponent } from './list-event-promotion-par-participant.component';

describe('ListEventPromotionParParticipantComponent', () => {
  let component: ListEventPromotionParParticipantComponent;
  let fixture: ComponentFixture<ListEventPromotionParParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEventPromotionParParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEventPromotionParParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
