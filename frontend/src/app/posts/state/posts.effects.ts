import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
;
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { exhaustMap, map, tap, catchError, of, switchMap } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { PostsService } from '../posts.service';
import * as fromActions from './posts.actions';
import { Post } from '../posts.model';

@Injectable()
export class PostsEffects {

    constructor(
        private actions$: Actions,
        private postsService: PostsService,
        private store: Store<AppState>
      ) {}

    fetchPostsEffect$ = createEffect(() => this.actions$.pipe(
            ofType(fromActions.fetchPosts),
            tap((action) => console.log('fetchPostsEffect$ action: ', action)),
            switchMap((params) => {
                return this.postsService.fetchPosts(params).pipe(
                    map(data => { 
                        console.log(data);
                        this.store.dispatch(fromActions.postsLoaded( { 
                            posts: data._embedded.posts, 
                            total: data.page.totalElements
                        }));
                    }),
                    catchError((errResp: HttpErrorResponse) => {
                        const empty: Post[] = [];
                        return of(this.store.dispatch(fromActions.postsLoaded( { 
                            posts: empty,
                            total: 0
                        } )));
                       //return of();
                    })
                );
            }),
        ), { dispatch: false }
    );

    getPostEffect$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.getPost),
        tap((action) => console.log('getPostEffect$ action: ', action)),
        switchMap((params) => {
            return this.postsService.getPostById(params.id).pipe(
                map(data => { 
                    console.log(data);
                    this.store.dispatch(fromActions.postLoaded( { 
                        post: data
                    }));
                }),
                catchError((errResp: HttpErrorResponse) => {
                    const empty: Post[] = [];
                    return of(this.store.dispatch(fromActions.postLoaded( { 
                        post: null
                    } )));
                })
            );
        }),
    ), { dispatch: false }
);

}