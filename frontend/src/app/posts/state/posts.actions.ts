import { createAction, props } from '@ngrx/store';

import { Post, PostParams } from '../posts.model';

const FETCH_POSTS = '[POSTS] FETCH POSTS';
const POSTS_LOADED = '[POSTS] POSTS LOADED';

const GET_POST  = '[POSTS] GET POST';
const POST_LOADED = '[POSTS] POST LOADED';

const CLEAR_POST = '[POSTS] CLEAR POST';

export const fetchPosts = createAction(
  FETCH_POSTS,
  props<PostParams>()
);
export const postsLoaded = createAction(
  POSTS_LOADED,
  props<{ posts: Post[], total: number }>()
);

export const getPost = createAction(
  GET_POST,
  props<{ id: number }>()
);
export const postLoaded = createAction(
  POST_LOADED,
  props<{ post: Post | null }>()
);
export const clearPost = createAction(
  CLEAR_POST
);


