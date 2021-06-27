import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Store} from "@ngrx/store";
import {
  getPosts, getPostsError, getPostsLoaded,
  getPostsLoading,
  getUsers,
  getUsersError,
  getUsersLoaded,
  getUsersLoading,
  RootReducerState
} from "../reducers";
import {combineLatest, Observable} from "rxjs";
import {UserListFailedAction, UserListRequestAction, UserListSuccessAction} from "../actions/user.action";
import {UserModel} from "../models/user.model";
import {PostModel} from "../models/post.model";
import {PostListFailedAction, PostListRequestAction, PostListSuccessAction} from "../actions/post.action";
import {take} from "rxjs/operators";

@Injectable()

export class DummyRepository {
  constructor(private apiServie: ApiService,
              private store: Store<RootReducerState>) {
  }

  getUsersList(force = false): [Observable<boolean>, Observable<UserModel[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUsersLoading);
    const loaded$ = this.store.select(getUsersLoaded);
    const usersList$ = this.store.select(getUsers);
    const error$ = this.store.select(getUsersError);

    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.apiServie.getAllUsers().subscribe(users => {
          this.store.dispatch(new UserListSuccessAction({users: users}));
        }, error => {
          this.store.dispatch(new UserListFailedAction());
        })
      }
    });

    return [loading$, usersList$, error$];
  }

  getPostsList(force = false): [Observable<boolean>, Observable<PostModel[]>, Observable<boolean>] {
    const loading$ = this.store.select(getPostsLoading);
    const loaded$ = this.store.select(getPostsLoaded);
    const postList$ = this.store.select(getPosts);
    const error$ = this.store.select(getPostsError);

    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.apiServie.getAllPosts().subscribe(posts => {
          this.store.dispatch(new PostListSuccessAction({posts: posts}));
        }, error => {
          this.store.dispatch(new PostListFailedAction());
        })
      }
    });

    return [loading$, postList$, error$];
  }
}
