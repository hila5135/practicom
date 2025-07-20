import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsListComponentComponent } from './lessons-list-component.component';

describe('LessonsListComponentComponent', () => {
  let component: LessonsListComponentComponent;
  let fixture: ComponentFixture<LessonsListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
