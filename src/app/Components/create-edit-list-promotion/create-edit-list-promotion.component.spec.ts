import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditListPromotionComponent } from './create-edit-list-promotion.component';

describe('CreateEditListPromotionComponent', () => {
  let component: CreateEditListPromotionComponent;
  let fixture: ComponentFixture<CreateEditListPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditListPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditListPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
