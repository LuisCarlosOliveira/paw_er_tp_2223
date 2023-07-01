import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(user));
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }, this.httpOptions)
      .pipe(tap(res => {
        this.handleAuthentication(username, res.id, res.token, res.role);
      }));
  }
  
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password }, this.httpOptions)
      .pipe(tap(res => {
        this.handleAuthentication(username, res.id, res.token, res.role);
      }));
  }
  

  handleAuthentication(username: string, id: string, token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    const user = { username, role, _id: id };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
}


  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  logout(): void {
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  public getRole(): string | null {
    return this.currentUserValue?.role;
  }

  canDeleteThread(threadCreatorId: string): boolean {
    let currentUserId = this.currentUserValue?._id;
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin' || currentUserRole === 'moderator') {
      return true;
    } else if (currentUserRole === 'user' && currentUserId === threadCreatorId) {
      return true;
    }
    return false;
  }

  canCreateThread(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'user' || currentUserRole === 'moderator' || currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canCreatePost(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'user' || currentUserRole === 'moderator' || currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canDeletePost(postCreatorId: string): boolean {
    let currentUserId = this.currentUserValue?._id;
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin' || currentUserRole === 'moderator') {
      return true;
    } else if (currentUserRole === 'user' && currentUserId === postCreatorId) {
      return true;
    }
    return false;
  }

  canEditThread(threadCreatorId: string): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    } else if (currentUserRole === 'moderator' && this.currentUserValue?._id === threadCreatorId) {
      return true;
    }
    return false;
  }

  canEditPost(postCreatorId: string): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    } else if (currentUserRole === 'moderator' && this.currentUserValue?._id === postCreatorId) {
      return true;
    }
    return false;
  }

  canCreateCourse(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canEditCourse(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canDeleteCourse(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canCreateSubject(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canEditSubject(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

  canDeleteSubject(): boolean {
    let currentUserRole = this.currentUserValue?.role;
    if (currentUserRole === 'admin') {
      return true;
    }
    return false;
  }

}

