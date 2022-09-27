import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaSearchUserComponent } from './ga-search-user.component';

describe('GaSearchUserComponent', () => {
  let component: GaSearchUserComponent;
  let fixture: ComponentFixture<GaSearchUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaSearchUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaSearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
