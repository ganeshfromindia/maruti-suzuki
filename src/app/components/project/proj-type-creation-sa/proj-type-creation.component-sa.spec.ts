import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjTypeCreationComponent } from './proj-type-creation.component';

describe('ProjTypeCreationComponent', () => {
  let component: ProjTypeCreationComponent;
  let fixture: ComponentFixture<ProjTypeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjTypeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjTypeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
