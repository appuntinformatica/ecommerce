import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, } from '@ngrx/store';

import { Post } from '../posts.model';
import * as fromActions from './posts.actions';
import { initialState } from './posts.state';

const postsAdapter = createEntityAdapter<Post>();

export const postsReducer = createReducer(
  initialState,
  on(fromActions.postsLoaded, (state, action) => {
    return postsAdapter.setAll(action.posts, {
      ...state,
      total: action.total
    })
  }),
  on(fromActions.postLoaded, (state, action) => {
    return postsAdapter.setOne(action.post!, {
      ...state,
      post: action.post
    })
  })
);

