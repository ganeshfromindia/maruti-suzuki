import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDesignationComponent } from './create-edit-designation.component';

describe('CreateEditDesignationComponent', () => {
  let component: CreateEditDesignationComponent;
  let fixture: ComponentFixture<CreateEditDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
