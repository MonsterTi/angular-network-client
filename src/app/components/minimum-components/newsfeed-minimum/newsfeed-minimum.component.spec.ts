import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsfeedMinimumComponent } from './newsfeed-minimum.component';

describe('NewsfeedMinimumComponent', () => {
  let component: NewsfeedMinimumComponent;
  let fixture: ComponentFixture<NewsfeedMinimumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsfeedMinimumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedMinimumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
