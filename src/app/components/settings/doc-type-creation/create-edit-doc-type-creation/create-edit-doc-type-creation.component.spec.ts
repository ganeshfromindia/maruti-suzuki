import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDocTypeCreationComponent } from './create-edit-doc-type-creation.component';

describe('CreateEditDocTypeCreationComponent', () => {
  let component: CreateEditDocTypeCreationComponent;
  let fixture: ComponentFixture<CreateEditDocTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDocTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDocTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
