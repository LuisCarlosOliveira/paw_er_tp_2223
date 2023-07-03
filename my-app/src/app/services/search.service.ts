import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Thread } from '../models/thread.model';


@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private API_URL = 'http://localhost:3000/searches';

    constructor(private http: HttpClient) { }

    searchPosts(term: string): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.API_URL}/posts?term=${term}&type=title`);
    }

    searchThreads(term: string): Observable<Thread[]> {
        return this.http.get<Thread[]>(`${this.API_URL}/threads?term=${term}&type=title`);
    }
}


