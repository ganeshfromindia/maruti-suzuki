import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypeCreationComponent } from './doc-type-creation.component';

describe('DocTypeCreationComponent', () => {
  let component: DocTypeCreationComponent;
  let fixture: ComponentFixture<DocTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
