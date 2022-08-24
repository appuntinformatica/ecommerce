import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, } from '@ngrx/store';

import { Post } from '../posts.model';
import { postsLoaded } from './posts.actions';
import { initialState } from './posts.state';

const postsAdapter = createEntityAdapter<Post>();

export const postsReducer = createReducer(
  initialState,
  on(postsLoaded, (state, action) => {
    return postsAdapter.setAll(action.posts, {
      ...state,
      total: action.total
    })
  })
);

