import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Store} from "@ngrx/store";
import {getPosts, getPostsLoaded, getPostsLoading, RootReducerState} from "../reducers";
import {combineLatest, Observable} from "rxjs";
import {PostListRequestAction, PostListSuccessAction} from "../actions/post.action";
import {PostModel} from "../models/post.model";

@Injectable()

export class PostsService {
  constructor(private apiService: ApiService,
              private store: Store<RootReducerState>) {
  }

  getPostsList(force = false): [Observable<boolean>, Observable<PostModel[]>] {
    const loading$ = this.store.select(getPostsLoading);
    const loaded$ = this.store.select(getPostsLoaded);
    const posts$ = this.store.select(getPosts);

    combineLatest([loading$, loaded$]).subscribe(data => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new PostListRequestAction());
        this.apiService.getAllPosts().pipe().subscribe(posts => {
          this.store.dispatch(new PostListSuccessAction({posts}))
        });
      }
    });

    return [loading$, posts$];


  }
}
