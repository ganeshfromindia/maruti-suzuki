import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocTypeCreationComponent } from './list-doc-type-creation.component';

describe('ListDocTypeCreationComponent', () => {
  let component: ListDocTypeCreationComponent;
  let fixture: ComponentFixture<ListDocTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDocTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
