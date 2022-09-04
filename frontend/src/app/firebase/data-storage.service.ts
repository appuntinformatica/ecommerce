import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../posts/posts.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  serverUrl = 'https://ng-post-backend-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  save(post: Post) {
    return this.http.post(`${this.serverUrl}/posts.json`, post);
  }
}
