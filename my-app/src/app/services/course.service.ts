import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model'; 

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/create`, course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/update/${id}`, course);
  }

  deleteCourse(id: string): Observable<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/delete/${id}`);
  }
}
