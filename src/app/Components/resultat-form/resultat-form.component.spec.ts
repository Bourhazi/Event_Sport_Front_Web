import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatFormComponent } from './resultat-form.component';

describe('ResultatFormComponent', () => {
  let component: ResultatFormComponent;
  let fixture: ComponentFixture<ResultatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
