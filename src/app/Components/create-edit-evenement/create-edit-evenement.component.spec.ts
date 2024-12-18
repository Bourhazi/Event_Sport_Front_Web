import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEvenementComponent } from './create-edit-evenement.component';

describe('CreateEditEvenementComponent', () => {
  let component: CreateEditEvenementComponent;
  let fixture: ComponentFixture<CreateEditEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditEvenementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
