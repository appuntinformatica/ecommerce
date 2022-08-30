import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';

import { environment } from './../../environments/environment';
import { AppState } from '../store/app.state';
import { Post, PostParams, PostsResponse } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchPosts(params: PostParams) : Observable<PostsResponse> {
    const url = `${environment.serverUrl}/api/posts/search/findByTitleOrContent?query=${params.query}&page=${params.page - 1}&size=${params.size}&sort=${params.sort}`;

    return this.http.get<PostsResponse>(url);
  }

  getPostById(id: number) : Observable<Post> {
    return this.http.get<Post>(`${environment.serverUrl}/api/posts/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>( `${environment.serverUrl}/api/posts/add`, post );
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>( `${environment.serverUrl}/api/posts/update/${id}`, post );
  }

  deletePost(id: number) {
    return this.http.delete( `${environment.serverUrl}/api/posts/delete/${id}`);
  }
}
