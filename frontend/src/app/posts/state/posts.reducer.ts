
import { createReducer, on } from '@ngrx/store';

import * as fromAdapter from './posts.adapter'
import * as fromActions from './posts.actions';
import { PostState } from './posts.state';


export const initialState: PostState = fromAdapter.adapter.getInitialState({
  selectedPost: null,
  total: 0
});

export const postsReducer = createReducer(
  initialState,

  on(fromActions.LoadPostsSuccess, (state, { payload }) => {
    state = fromAdapter.adapter.removeAll({ 
      ...state,
      selectedPost: null,
      total: payload.page.totalElements
    });
    return fromAdapter.adapter.addMany(payload._embedded.posts, state);
  }),
  on(fromActions.LoadPostsError, (state) => {
    return fromAdapter.adapter.removeAll({ 
      ...state,
      selectedPost: null,
      total: 0
    });    
  }),

  on(fromActions.LoadPostByIdSuccess, (state, { payload }) => Object.assign({
    ...state,
    selectedPost: payload.post,
    total: 0
  }))
);