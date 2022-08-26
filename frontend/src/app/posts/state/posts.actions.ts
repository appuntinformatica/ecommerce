import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Post, PostParams, PostsResponse } from '../posts.model';

enum PostActionType {
  ADD_POST = '[POST] Add POST',
  ADD_POSTS = '[POST] Add POSTs',
  UPDATE_POST = '[POST] Update POST',
  UPDATE_POSTS = '[POST] Update POSTs',
  REMOVE_POST = '[POST] Remove POST',
  REMOVE_POSTS = '[POST] Remove POSTs',
  CLEAR_POSTS = '[POST] Clear POSTs',
  LOAD_ALL_POSTS = '[POST] Load All POSTs',
  LOAD_ALL_POSTS_SUCCESS = '[POST] Load All Posts Success',
  LOAD_ALL_POSTS_ERROR = '[POST] Load All Posts Error',
  LOAD_POST_BY_ID = '[POST] Load Post By Id',
  LOAD_POST_BY_ID_SUCCESS = '[POST] Load Post By Id Success',
  LOAD_POST_BY_ID_ERROR = '[POST] Load Post By Id Error',
  SELECT_POST = '[POST] POST By Id'
}

export const LoadPosts = createAction(PostActionType.LOAD_ALL_POSTS,
  props<{ payload: { postParams: PostParams }}>()
);
export const LoadPostsSuccess = createAction(PostActionType.LOAD_ALL_POSTS_SUCCESS,
  props<{payload: PostsResponse }>()
);
export const LoadPostsError = createAction(PostActionType.LOAD_ALL_POSTS_ERROR);


export const LoadPostById = createAction(PostActionType.LOAD_POST_BY_ID,
  props<{ payload: { id: number }}>()
);
export const LoadPostByIdSuccess = createAction(PostActionType.LOAD_POST_BY_ID_SUCCESS,
  props<{payload: { post: Post | null | undefined }}>()
);
export const LoadPostByIdError = createAction(PostActionType.LOAD_POST_BY_ID_ERROR);


export const AddPost = createAction(PostActionType.ADD_POST,
  props<{payload: { post: Post }}>());



export const AddPosts = createAction(PostActionType.ADD_POSTS,
  props<{payload: { posts: Post[] }}>());
  
export const UpdatePost = createAction(PostActionType.UPDATE_POST,
  props<{payload: { post: Update<Post> }}>());
export const UpdatePosts = createAction(PostActionType.UPDATE_POSTS,
  props<{payload: { posts: Update<Post>[] }}>());

export const RemovePost = createAction(PostActionType.REMOVE_POST,
  props<{payload: { id: number }}>());
export const RemovePosts = createAction(PostActionType.REMOVE_POSTS,
  props<{payload: { ids: number[] }}>());
export const ClearPosts = createAction(PostActionType.CLEAR_POSTS);




export const SelectPost = createAction(PostActionType.SELECT_POST,
  props<{payload: { postId: number }}>()
);