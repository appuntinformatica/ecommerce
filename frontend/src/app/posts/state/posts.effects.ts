import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
;
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, tap, catchError, of, switchMap, mergeMap, Observable, throwError } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { PostsService } from '../posts.service';
import * as fromActions from './posts.actions';

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private postsService: PostsService,
        private store: Store<AppState>,
        private route: Router
      ) {}

    loadPosts$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.LoadPosts),
        mergeMap((props) => 
        this.postsService.fetchPosts(props.payload.postParams).pipe(
            map(data => fromActions.LoadPostsSuccess({ payload: data })),
            catchError((errResp: HttpErrorResponse) => of(fromActions.LoadPostsError()))
        )))
    )

    loadPostById$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.LoadPostById),
        mergeMap((props) => 
        this.postsService.getPostById(props.payload.id).pipe(
            map(data => fromActions.LoadPostByIdSuccess({ payload: { post: data } })),
            catchError((errResp: HttpErrorResponse) => of(fromActions.LoadPostByIdError()))
        )))
    )

    addPost$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.AddPost),
        mergeMap((props) => 
        this.postsService.addPost(props.payload.post).pipe(
            map(data => {
                fromActions.LoadPostByIdSuccess({payload: { post: data }});
                this.route.navigate(['/posts/post-list']);
            }),
            catchError((errResp: HttpErrorResponse) => of( () => {
                    fromActions.LoadPostByIdSuccess(  { 
                        payload: { post: null }
                    } );
                    this.route.navigate(['/posts/post-edit']);
                })
            )
        ))), { dispatch: false }
    )


}