import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTypeComponent } from './create-edit-type.component';

describe('CreateEditTypeComponent', () => {
  let component: CreateEditTypeComponent;
  let fixture: ComponentFixture<CreateEditTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
