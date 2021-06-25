import {PostModel} from "../models/post.model";

export const POST_LIST_REQUEST = "post list request";
export const POST_LIST_SUCCESS = "post list success";

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}

export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;
  constructor(public payload?: {posts: PostModel[]}) {
  }
}
