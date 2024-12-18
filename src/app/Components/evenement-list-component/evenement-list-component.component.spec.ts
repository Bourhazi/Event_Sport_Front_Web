import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementListComponentComponent } from './evenement-list-component.component';

describe('EvenementListComponentComponent', () => {
  let component: EvenementListComponentComponent;
  let fixture: ComponentFixture<EvenementListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
