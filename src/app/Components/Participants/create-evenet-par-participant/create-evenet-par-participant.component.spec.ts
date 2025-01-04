import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvenetParParticipantComponent } from './create-evenet-par-participant.component';

describe('CreateEvenetParParticipantComponent', () => {
  let component: CreateEvenetParParticipantComponent;
  let fixture: ComponentFixture<CreateEvenetParParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvenetParParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEvenetParParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
