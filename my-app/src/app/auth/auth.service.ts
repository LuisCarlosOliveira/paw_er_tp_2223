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
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  // autenticar o usuário
  login(username: string, password: string): Observable<any> {
    console.log(`Log user com username: ${username} e pass: ${password}`); 
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }, this.httpOptions)
      .pipe(tap(res => {
        console.log(res); 
        this.handleAuthentication(username, res.token, res.role);
      }));
  }

  // registar um novo usuário
  register(username: string, password: string): Observable<any> {
    console.log(`Registar user com username: ${username} e pass: ${password}`);
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password }, this.httpOptions)
      .pipe(tap(res => {
        console.log(res); 
        this.handleAuthentication(username, res.token, res.role);
      }));
  }

  // handle authentication
  handleAuthentication(username: string, token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    // When user logs in, set the current user
    this.currentUserSubject.next({ username, role });
  }

  // check if the user is logged in
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if(token) {
      return true;
    }
    return false;
  }

  // get the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // remove the token
  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    // When user logs out, set the current user to null
    this.currentUserSubject.next(null);
  }


  logout(): void {
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

}
