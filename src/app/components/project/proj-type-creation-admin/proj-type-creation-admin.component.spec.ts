import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjTypeCreationAdminComponent } from './proj-type-creation-admin.component';

describe('ProjTypeCreationAdminComponent', () => {
  let component: ProjTypeCreationAdminComponent;
  let fixture: ComponentFixture<ProjTypeCreationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjTypeCreationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjTypeCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
