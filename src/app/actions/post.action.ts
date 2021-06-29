import {PostModel} from "../models/post.model";

export const POST_LIST_REQUEST = "post list request";
export const POST_LIST_SUCCESS = "post list success";
export const POST_LIST_FAILED = "post list failed";
export const POST_DELETE = "post delete"

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}

export class PostListFailedAction {
  readonly type = POST_LIST_FAILED;
}

export class PostDeleteAction {
  readonly type = POST_DELETE;
  constructor(public payload?: {id: number}) {
  }
}

export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;
  constructor(public payload?: {posts: PostModel[]}) {
  }
}
