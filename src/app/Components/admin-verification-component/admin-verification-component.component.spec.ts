import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerificationComponentComponent } from './admin-verification-component.component';

describe('AdminVerificationComponentComponent', () => {
  let component: AdminVerificationComponentComponent;
  let fixture: ComponentFixture<AdminVerificationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVerificationComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVerificationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
