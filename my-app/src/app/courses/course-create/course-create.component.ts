import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup = {} as FormGroup;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // Adicione mais campos conforme necessário
    });
  }

  onSubmit(): void {
    this.courseService.createCourse(this.courseForm.value).subscribe(course => {
      console.log(course);
      // Redirecione para a lista de cursos ou onde preferir
    });
  }
}
