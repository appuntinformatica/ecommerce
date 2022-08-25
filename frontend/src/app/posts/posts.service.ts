import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { AppState } from '../store/app.state';
import { Post, PostParams, PostsResponse } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchPosts(params: PostParams) : Observable<PostsResponse> {
    const url = `${environment.serverUrl}/api/posts/search/findByTitleOrContent?query=${params.query}&page=${params.page - 1}&size=${params.size}`;

    return this.http.get<PostsResponse>(url);
  }

  getPostById(id: number) : Observable<Post> {
    const url = `${environment.serverUrl}/api/posts/${id}`;

    return this.http.get<Post>(url);
  }

}
