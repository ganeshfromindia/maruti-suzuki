import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjTypeCreationComponent } from './create-edit-proj-type-creation.component';

describe('CreateEditProjTypeCreationComponent', () => {
  let component: CreateEditProjTypeCreationComponent;
  let fixture: ComponentFixture<CreateEditProjTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProjTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditProjTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
