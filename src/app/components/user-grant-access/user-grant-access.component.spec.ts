import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGrantAccessComponent } from './user-grant-access.component';

describe('UserGrantAccessComponent', () => {
  let component: UserGrantAccessComponent;
  let fixture: ComponentFixture<UserGrantAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGrantAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGrantAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
