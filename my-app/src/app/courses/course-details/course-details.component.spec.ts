import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailComponent } from './course-details.component';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailComponent]
    });
    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});