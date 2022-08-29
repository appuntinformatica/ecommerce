import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Post, PostParams } from './../posts.model';
import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

import * as fromSelector from '../state/posts.selector';
import * as fromActions from '../state/posts.actions';

import { NgbdSortableHeader, SortEvent } from 'src/app/shared/ngbd-sortable-header/ngbd-sortable-header.directive';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  posts$ = this.store.select(fromSelector.selectAllPosts);
  total$ = this.store.select(fromSelector.postsTotal);

  query: string = '';
  page: number = 0;
  pageSize: number = 10;
  sort: string = 'title,desc';
 

  filter = new FormControl('', {nonNullable: true});

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader<Post>>;
  
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      if ( params.get('query') ) {
        this.query = params.get('query')!;
        this.filter.setValue(this.query);
      }
      this.loadPosts();
    });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  loadPosts() {
    console.log('PostsListComponent.loadPosts()');
    const postParams: PostParams = {
      query: this.query,
      page: this.page,
      size: this.pageSize,
      sort: this.sort
    }
    this.store.dispatch(fromActions.LoadPosts({ payload: { postParams: postParams } }));
  }

  onSearch() {
    console.log('PostsListComponent.onSearch()');
    this.router.navigate([`posts/post-list/${this.filter.value}`]);
  }

  onSort(sortEvent: SortEvent<Post>) {
    console.log('PostsListComponent.onSort() sortEvent: ', sortEvent);
  }
}
