export class Post {
    constructor(
                public id: number,
                public datetime: Date,
                public title: string,
                public content: string) { }
}

export interface PostParams {
    query: string;
    page: number;
    size: number;
    sort: string;
}

export interface PostsResponse {
    "_embedded": {
        "posts": Post[]
    },
    "page": {
          "size": number,
          "totalElements": number,
          "totalPages": number,
          "number": number
      }
  }
  