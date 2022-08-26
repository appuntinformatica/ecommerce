import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Post } from "../posts.model";


export interface PostState extends EntityState<Post> {
  selectedPost: Post | null;
  total: number;
}
