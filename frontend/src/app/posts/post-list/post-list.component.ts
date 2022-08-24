import { Post, PostParams } from './../posts.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import * as fromPostsSelector from '../state/posts.selector';
import * as fromPostsActions from '../state/posts.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts$ = this.store.select(fromPostsSelector.getPosts);
  total$ = this.store.select(fromPostsSelector.getTotal);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    console.log('PostsListComponent.loadPosts() page = ');
    // this.store.dispatch(SharedActions.setLoadingSpinner({ status: true }));
    const params: PostParams = {
      query: '',
      page: 1,
      size: 10,
      sort: 'title,asc'
    }
    this.store.dispatch(fromPostsActions.fetchPosts(params));
  }

  onSort(sortEvent: any) {  /*TODO: SortEvent  */
    console.log('PostsListComponent.onSort() sortEvent: ', sortEvent);
  }
}
