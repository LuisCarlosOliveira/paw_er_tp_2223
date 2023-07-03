import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { SubjectService } from '../../services/subject.service';
import { Course } from '../../models/course.model';
import { Subject } from '../../models/subject.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  subjects!: Subject[];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCourse();
    this.getSubjects();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(id).subscribe(course => this.course = course);
    } else {

    }
  }

  getSubjects(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectsByCourseId(id).subscribe(subjects => this.subjects = subjects);
    } else {
    
    }
  }

  goBack(): void {
    this.location.back();
}



}