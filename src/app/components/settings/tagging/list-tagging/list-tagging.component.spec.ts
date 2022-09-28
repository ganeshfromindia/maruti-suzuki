import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaggingComponent } from './list-tagging.component';

describe('ListTaggingComponent', () => {
  let component: ListTaggingComponent;
  let fixture: ComponentFixture<ListTaggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaggingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
