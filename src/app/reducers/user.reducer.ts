import {UserModel} from "../models/user.model";
import {Action} from "../actions";
import { USER_LIST_REQUEST, USER_LIST_SUCCESS} from "../actions/user.action";

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  users: UserModel[];
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  users: []
}

export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case USER_LIST_SUCCESS: {
      const updatedUsers = state.users.concat(action.payload.users)
      return {...state, loading: false, loaded: true, users: updatedUsers};
    }
    default: {
      return state;
    }
  }
}

export const getUsersLoading = (state: UserReducerState) => state.loading;
export const getUsersLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;


