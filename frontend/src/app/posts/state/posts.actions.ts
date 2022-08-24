import { createAction, props } from '@ngrx/store';

import { Post, PostParams } from '../posts.model';

const FETCH_POSTS = '[POSTS] FETCH POSTS';
const POSTS_LOADED = '[POSTS] POSTS LOADED';

export const fetchPosts = createAction(
  FETCH_POSTS,
  props<PostParams>()
);
export const postsLoaded = createAction(
  POSTS_LOADED,
  props<{ posts: Post[], total: number }>()
);


