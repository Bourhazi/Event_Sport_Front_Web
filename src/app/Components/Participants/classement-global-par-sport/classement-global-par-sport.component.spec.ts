import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementGlobalParSportComponent } from './classement-global-par-sport.component';

describe('ClassementGlobalParSportComponent', () => {
  let component: ClassementGlobalParSportComponent;
  let fixture: ComponentFixture<ClassementGlobalParSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassementGlobalParSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassementGlobalParSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
