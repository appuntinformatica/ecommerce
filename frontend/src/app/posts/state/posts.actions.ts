import { createAction, props } from '@ngrx/store';

import { Post, PostParams, PostsResponse } from '../posts.model';

enum PostActionType {

  LOAD_ALL_POSTS = '[POST] Load All POSTs',
  LOAD_ALL_POSTS_SUCCESS = '[POST] Load All Posts Success',
  LOAD_ALL_POSTS_ERROR = '[POST] Load All Posts Error',
  LOAD_POST_BY_ID = '[POST] Load Post By Id',
  LOAD_POST_BY_ID_SUCCESS = '[POST] Load Post By Id Success',
  LOAD_POST_BY_ID_ERROR = '[POST] Load Post By Id Error',
  SELECT_POST = '[POST] POST By Id',
  ADD_POST = '[POST] Add POST',
  UPDATE_POST = '[POST] Update POST',
  REMOVE_POST = '[POST] Remove POST'
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

export const UpdatePost = createAction(PostActionType.UPDATE_POST,
  props<{payload: { post: Post }}>());

  export const RemovePost = createAction(PostActionType.REMOVE_POST,
    props<{payload: { id: number }}>());








export const SelectPost = createAction(PostActionType.SELECT_POST,
  props<{payload: { postId: number }}>()
);