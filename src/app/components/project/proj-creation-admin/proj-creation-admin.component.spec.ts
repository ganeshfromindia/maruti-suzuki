import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjCreationAdminComponent } from './proj-creation-admin.component';

describe('ProjCreationAdminComponent', () => {
  let component: ProjCreationAdminComponent;
  let fixture: ComponentFixture<ProjCreationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjCreationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
