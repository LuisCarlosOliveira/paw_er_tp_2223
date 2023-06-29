import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';  // Atualize este caminho para o serviço Subject

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
  subjectForm: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.subjectForm.valid) {
      this.subjectService.createSubject(this.subjectForm.value)
        .subscribe(newSubject => {
          console.log('Subject created', newSubject);
          this.subjectForm.reset();
        });
    }
  }
}
