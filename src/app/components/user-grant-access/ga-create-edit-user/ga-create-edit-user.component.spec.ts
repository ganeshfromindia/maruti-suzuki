import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaCreateEditUserComponent } from './ga-create-edit-user.component';

describe('GaCreateEditUserComponent', () => {
  let component: GaCreateEditUserComponent;
  let fixture: ComponentFixture<GaCreateEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaCreateEditUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaCreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
