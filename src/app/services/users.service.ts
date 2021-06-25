import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUsers, getUsersLoaded, getUsersLoading, RootReducerState} from "../reducers";
import {combineLatest, Observable} from "rxjs";
import {UserListRequestAction, UserListSuccessAction} from "../actions/user.action";
import {ApiService} from "./api.service";
import {UserModel} from "../models/user.model";

@Injectable()

export class UsersService {
  constructor(private store: Store<RootReducerState>,
              private apiService: ApiService) {
  }

  getUsersList(force =false): [Observable<boolean>, Observable<UserModel[]>] {
    const loading$ = this.store.select(getUsersLoading);
    const loaded$ = this.store.select(getUsersLoaded);
    const getUserList$ = this.store.select(getUsers);

    combineLatest([loading$, loaded$]).subscribe(data => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.apiService.getAllUsers().pipe().subscribe(data => {
          this.store.dispatch(new UserListSuccessAction({users: data}));
        });
      }
    })

    return [loading$,getUserList$];
  }
}
