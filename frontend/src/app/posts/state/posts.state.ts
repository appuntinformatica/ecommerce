import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Post } from "../posts.model";

export interface PostsEntity extends EntityState<Post> {
  total: number;
}


export interface PostsState extends EntityState<Post> {
    total: number;
}

export const postsAdapter = createEntityAdapter<Post>({
    /* sortComparer: sortByName, */
});

export const initialState: PostsState = postsAdapter.getInitialState({
    total: 0
});
  

export function sortByName(a: Post, b: Post): number {
    const compare = a.title.localeCompare(b.title);
    if (compare > 0) {
      return 1;
    }
  
    if (compare < 0) {
      return -1;
    }
  
    return compare;
  }