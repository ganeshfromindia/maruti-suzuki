import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjTypeCreationComponent } from './list-proj-type-creation.component';

describe('ListProjTypeCreationComponent', () => {
  let component: ListProjTypeCreationComponent;
  let fixture: ComponentFixture<ListProjTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
