import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from '../auth/state/auth.state';
import * as fromAuth from '../auth/state/auth.reducer';

import { SharedState } from '../shared/state/shared.state';
import * as fromShared from '../shared/state/shared.reducer';

import { PostsState } from '../posts/state/posts.state';
import * as fromPosts from '../posts/state/posts.reducer';

export interface AppState {
  shared: SharedState,
  auth: AuthState;
  posts: PostsState;
}

export const appReducer : ActionReducerMap<AppState> = {
  shared: fromShared.sharedReducer,
  auth: fromAuth.authReducer,
  posts: fromPosts.postsReducer
};


