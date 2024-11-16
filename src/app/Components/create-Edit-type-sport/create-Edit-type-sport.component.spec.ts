import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeSportComponent } from './create-Edit-type-sport.component';

describe('CreateTypeSportComponent', () => {
  let component: CreateTypeSportComponent;
  let fixture: ComponentFixture<CreateTypeSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTypeSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTypeSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
