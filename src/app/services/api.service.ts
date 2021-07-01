import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {map} from "rxjs/operators";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";
import {PostModel} from "../models/post.model";

@Injectable()

export class ApiService {
  constructor(private httpService: HttpService) {
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.httpService.get('/users')
      .pipe(map(data => data as UserModel[]))
  }

  getUserById(id: number): Observable<UserModel> {
    return this.httpService.get('/users/' + id);
  }

  getAllPosts(): Observable<PostModel[]> {
    return this.httpService.get('/posts')
      .pipe(map(data => data as PostModel[]));
  }
}
