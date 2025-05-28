import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerComponentComponent } from './lecturer-component.component';

describe('LecturerComponentComponent', () => {
  let component: LecturerComponentComponent;
  let fixture: ComponentFixture<LecturerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
