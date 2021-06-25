import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import {PostModel} from "../models/post.model";
import {PostsService} from "../services/posts.service";

@Component({
  selector: "app-post",
  template: `
    <div class="container">
    <app-posts-list [posts]="posts"></app-posts-list>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }
    app-posts-list {
      display: flex;
      flex-wrap: wrap;
    }`]
})

export class PostComponent implements OnInit {

  posts: PostModel[] = [];
  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    const posts$ = this.postsService.getPostsList()[1];
    posts$.subscribe(posts => {
      this.posts = posts;
    })
  }
}
