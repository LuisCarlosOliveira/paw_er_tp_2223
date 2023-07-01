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
      // Handle the case where id is null
      //TO DO: redirect to an error page or show a message to the user

    }
  }

  getSubjects(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectsByCourseId(id).subscribe(subjects => this.subjects = subjects);
    } else {
      // Handle the case where id is null
      // TO DO: redirect to an error page or show a message to the user
    }
  }

  goBack(): void {
    this.location.back();
}



}