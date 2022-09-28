import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchRightComponent } from './list-search-right.component';

describe('ListSearchRightComponent', () => {
  let component: ListSearchRightComponent;
  let fixture: ComponentFixture<ListSearchRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSearchRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSearchRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
