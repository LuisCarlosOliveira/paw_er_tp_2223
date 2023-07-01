import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private baseUrl = 'http://localhost:3000/posts'; // Altere para a URL base correta
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private authService: AuthService) { }

    getPostsByThreadId(id: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/thread/${id}`, { headers: this.headers });
    }

    createPost(post: Post): Observable<Post> {
        const role = this.authService.getRole();

        if (role === 'user' || role === 'moderator' || role === 'admin') {
            return this.http.post<Post>(this.baseUrl, post, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    upvotePost(id: string): Observable<Post> {
        const role = this.authService.getRole();

        if (role === 'user' || role === 'moderator' || role === 'admin') {
            return this.http.post<Post>(`${this.baseUrl}/${id}/upvote`, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    downvotePost(id: string): Observable<Post> {
        const role = this.authService.getRole();

        if (role === 'user' || role === 'moderator' || role === 'admin') {
            return this.http.post<Post>(`${this.baseUrl}/${id}/downvote`, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    editPost(post: Post): Observable<Post> {
        const role = this.authService.getRole();

        if (role === 'user' || role === 'moderator' || role === 'admin') {
            return this.http.put<Post>(`${this.baseUrl}/${post._id}`, post, { headers: this.headers });
        } else {
            throw new Error('Unauthorized');
        }
    }

    toggleHidePost(id: string): Observable<Post> {
        return this.http.post<Post>(`${this.baseUrl}/${id}/toggleHide`, { headers: this.headers });
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.headers, responseType: 'text' as 'json' });
    }

}
