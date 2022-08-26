import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { Post } from "../posts.model";

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

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
    /* sortComparer: sortByName, */
});


export const {
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: postsTotal
} = adapter.getSelectors();