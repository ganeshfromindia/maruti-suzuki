import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRightComponent } from './search-right.component';

describe('SearchRightComponent', () => {
  let component: SearchRightComponent;
  let fixture: ComponentFixture<SearchRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
