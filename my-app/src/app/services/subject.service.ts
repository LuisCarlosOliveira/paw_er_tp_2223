import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'http://localhost:3000/subjects'; 

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl);
  }

  getSubjectById(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/${id}`);
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}/create`, subject);
  }

  updateSubject(id: string, subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.apiUrl}/${id}`, subject);
  }

  deleteSubject(id: string): Observable<Subject> {
    return this.http.delete<Subject>(`${this.apiUrl}/${id}`);
  }
  
  getSubjectsByCourseId(courseId: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/course/${courseId}`);
  }

  addSubjectToCourse(courseId: string, subjectId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/courses/${courseId}/subjects/${subjectId}`, {});
  }

}

