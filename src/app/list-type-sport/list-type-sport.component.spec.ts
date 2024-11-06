import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeSportComponent } from './list-type-sport.component';

describe('ListTypeSportComponent', () => {
  let component: ListTypeSportComponent;
  let fixture: ComponentFixture<ListTypeSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
