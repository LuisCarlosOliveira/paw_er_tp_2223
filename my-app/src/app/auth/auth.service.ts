import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // autenticar o usuário
  login(username: string, password: string): Observable<any> {
    console.log(`Log user com username: ${username} e pass: ${password}`); 
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }, this.httpOptions);
  }
  

  // registar um novo usuário
  register(username: string, password: string): Observable<any> {
    console.log(`Registar user com username: ${username} e pass: ${password}`);
    return this.http.post<any>(`${this.baseUrl}/register`, { username, password }, this.httpOptions);
  }
  

  /* quando implementar a ligação ao backeng, isLoggedIn fica assim
  isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    if(token) {
      return true;
    }
    return false;
  }*/

  isLoggedIn(): boolean {
    return false;
  }
  

  //  obter o token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // armazenar o token
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //  remover o token
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
