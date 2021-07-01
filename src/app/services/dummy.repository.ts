import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Store} from "@ngrx/store";
import {
  getPosts, getPostsError, getPostsLoaded,
  getPostsLoading, getUserById,
  getUsers,
  getUsersError,
  getUsersLoaded,
  getUsersLoading,
  RootReducerState
} from "../reducers";
import {combineLatest, Observable} from "rxjs";
import {
  UserAddAction,
  UserDeleteAction,
  UserListFailedAction,
  UserListRequestAction,
  UserListSuccessAction, UserUpdateAction
} from "../actions/user.action";
import {UserModel} from "../models/user.model";
import {PostModel} from "../models/post.model";
import {
  PostDeleteAction,
  PostListFailedAction,
  PostListRequestAction,
  PostListSuccessAction
} from "../actions/post.action";
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

  deleteUser(id: number) {
    //first we call actual delete api
    this.store.dispatch(new UserDeleteAction({id: id}))
  }

  updateUser(user: UserModel) {
    //first we call actual update api
    this.store.dispatch(new UserUpdateAction({user: user}))
  }

  addUser(data: any) {
    //first we call actual update api
    this.store.dispatch(new UserAddAction({data: data}));
  }

  getUserById(id: number, force=false) {
    console.log("store", this.store.select(state => console.log("state", state)));
    const user$ = this.store.select(state => getUserById(state, id));
    user$.pipe(take(1)).subscribe(data => {
      if (!data || force) {
        return this.apiServie.getUserById(id).subscribe(res => {
          this.store.dispatch(new UserAddAction({data: res}))
        })
      }
      return data;
    });

    return user$;
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

  deletePost(id: number) {
    this.store.dispatch(new PostDeleteAction({id: id}))
  }
}
