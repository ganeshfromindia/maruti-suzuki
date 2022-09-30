import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjHierarchyCreationSaComponent } from './proj-hierarchy-creation-sa.component';

describe('ProjHierarchyCreationSaComponent', () => {
  let component: ProjHierarchyCreationSaComponent;
  let fixture: ComponentFixture<ProjHierarchyCreationSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjHierarchyCreationSaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjHierarchyCreationSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
