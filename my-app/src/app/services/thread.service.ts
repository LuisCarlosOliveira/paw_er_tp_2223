import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Thread } from '../models/thread.model';
import { AuthService } from './auth.service';
import { Post } from '../models/post.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ThreadService {
    private baseUrl = 'http://localhost:3000/threads';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private authService: AuthService) { }

    createThread(thread: Thread): Observable<Thread> {
        const role = this.authService.getRole();

        if (role === 'user' || role === 'moderator' || role === 'admin') {
            return this.http.post<Thread>(this.baseUrl, thread, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    getThreads(): Observable<Thread[]> {
        return this.http.get<Thread[]>(this.baseUrl, { headers: this.headers })
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 403) {
                    // Lidar com a situação em que o usuário não tem permissão para ver o thread
                    console.error("Acesso negado ao thread.");
                }
                // Relançar o erro para que possa ser tratado por qualquer outra parte do código que esteja inscrita nesse Observable
                return throwError(err);
            }));
    }
    
    getThreadById(id: string): Observable<Thread> {
        return this.http.get<Thread>(`${this.baseUrl}/${id}`, { headers: this.headers })
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 403) {
                    // Lidar com a situação em que o usuário não tem permissão para ver o thread
                    console.error("Acesso negado ao thread.");
                }
                // Relançar o erro para que possa ser tratado por qualquer outra parte do código que esteja inscrita nesse Observable
                return throwError(err);
            }));
    }
    

    updateThread(id: string, thread: Thread): Observable<Thread> {
        const role = this.authService.getRole();

        if (role === 'admin' || (role === 'moderator' && thread.creator == this.authService.currentUserValue._id)) {
            return this.http.put<Thread>(`${this.baseUrl}/${id}`, thread, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    toggleHideThread(id: string): Observable<Thread> {
        const role = this.authService.getRole();
        const userId = this.authService.currentUserValue._id;
    
        return this.getThreadById(id).pipe(
            switchMap(thread => {
                if (role === 'admin' || role === 'moderator' || (role === 'user' && thread.creator == userId)) {
                    return this.http.post<Thread>(`${this.baseUrl}/${id}/hide`, { headers: this.headers });
                } else {
                    throw new Error('Unauthorized');
                }
            })
        );
    }

    deleteThread(id: string): Observable<Thread> {
        const role = this.authService.getRole();
        if (role === 'admin' || role === 'moderator') {
            return this.http.delete<Thread>(`${this.baseUrl}/${id}`, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    getThreadsBySubjectId(id: string): Observable<Thread[]> {
        return this.http.get<Thread[]>(`${this.baseUrl}/subjects/${id}`, { headers: this.headers });
    }

    getPostsByThreadId(threadId: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/${threadId}/posts`, { headers: this.headers });
    }

}
