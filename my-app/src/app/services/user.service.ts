import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
}


  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`, this.httpOptions());
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, userData, this.httpOptions());
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`, this.httpOptions());
  }
  
}

