import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditParticipantComponent } from './create-edit-participant.component';

describe('CreateEditParticipantComponent', () => {
  let component: CreateEditParticipantComponent;
  let fixture: ComponentFixture<CreateEditParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditParticipantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
