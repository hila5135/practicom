import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponentComponent } from './users-component.component';

describe('UsersComponentComponent', () => {
  let component: UsersComponentComponent;
  let fixture: ComponentFixture<UsersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
