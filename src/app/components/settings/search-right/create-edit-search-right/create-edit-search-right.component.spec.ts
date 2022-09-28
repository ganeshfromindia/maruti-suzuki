import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSearchRightComponent } from './create-edit-search-right.component';

describe('CreateEditSearchRightComponent', () => {
  let component: CreateEditSearchRightComponent;
  let fixture: ComponentFixture<CreateEditSearchRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSearchRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSearchRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
