
import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from '../auth/state/auth.state';
import * as fromAuth from '../auth/state/auth.reducer';

import { SharedState } from '../shared/state/shared.state';
import * as fromShared from '../shared/state/shared.reducer';

import { PostState } from '../posts/state/posts.state';
import * as fromPosts from '../posts/state/posts.reducer';

const nameof = <T>(name: keyof T) => name;

export const postState = nameof<AppState>("postState") as string;

export interface AppState {
  shared: SharedState,
  auth: AuthState;
  postState: PostState;
}

export const appReducer : ActionReducerMap<AppState> = {
  shared: fromShared.sharedReducer,
  auth: fromAuth.authReducer,
  postState: fromPosts.postsReducer
};




