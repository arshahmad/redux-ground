import {PostModel} from "../models/post.model";
import {Action} from "../actions";
import {POST_LIST_FAILED, POST_LIST_REQUEST, POST_LIST_SUCCESS} from "../actions/post.action";

export interface PostReducerState {
  loading: boolean,
  loaded: boolean,
  error: boolean,
  posts: PostModel[],
}

const initialState: PostReducerState = {
  loading: false,
  loaded: false,
  error: false,
  posts: []
}

export function postReducer(state = initialState, action: Action ): PostReducerState {
  switch (action.type) {
    case POST_LIST_REQUEST: {
      return {...state, loading: true}
    }
    case POST_LIST_FAILED: {
      return {...state, error: true, loading: false}
    }
    case POST_LIST_SUCCESS: {
      const updatedPosts = state.posts.concat(action.payload.posts);
      return {...state, loading: false, loaded: true, posts: updatedPosts, error: false}
    } default: {
      return state;
    }
  }
}

export const getPostsLoading = (state: PostReducerState) => state.loading;
export const getPostsLoaded = (state: PostReducerState) => state.loaded;
export const getPosts = (state: PostReducerState) => state.posts;
export const getPostsError = (state: PostReducerState) => state.error;

