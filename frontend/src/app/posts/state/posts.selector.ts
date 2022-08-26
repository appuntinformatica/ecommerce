
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostState } from './posts.state';
import * as fromAdapter from './posts.adapter';
import { postState } from 'src/app/store/app.state';

export const getPostState = createFeatureSelector<PostState>(postState);


export const selectAllPosts = createSelector(getPostState, fromAdapter.selectAllPosts);
export const postsTotal = createSelector(getPostState, (state) => state.total);

export const selectPostById = createSelector(getPostState, (state: PostState) => state.selectedPost);
