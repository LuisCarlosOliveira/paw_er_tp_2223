import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service'; // Atualize este caminho para o serviço Subject
import { Subject } from '../../models/subject.model';  // Atualize este caminho para o modelo de Subject

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);
  }
}
