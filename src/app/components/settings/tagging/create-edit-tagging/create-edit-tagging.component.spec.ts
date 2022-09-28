import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaggingComponent } from './create-edit-tagging.component';

describe('CreateEditTaggingComponent', () => {
  let component: CreateEditTaggingComponent;
  let fixture: ComponentFixture<CreateEditTaggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTaggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
