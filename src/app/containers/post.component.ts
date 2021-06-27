import {Component, OnInit} from "@angular/core";
import {PostModel} from "../models/post.model";
import {DummyRepository} from "../services/dummy.repository";

@Component({
  selector: "app-post",
  template: `
    <div class="container">
      <div *ngIf="!isLoading && !error">
    <app-posts-list [posts]="posts"></app-posts-list>
      </div>
      <div class="spinner" *ngIf="isLoading">
        <mat-spinner></mat-spinner>
      </div>
      <div *ngIf="error && !isLoading" fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="20px">
        <app-error (reload)="tryAgain()"></app-error>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    app-posts-list {
      display: flex;
      flex-wrap: wrap;
    }
    .spinner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
    }

  `]
})

export class PostComponent implements OnInit {

  posts: PostModel[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  constructor(private dummyRepository: DummyRepository) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    const observer$ = this.dummyRepository.getPostsList();
    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];
    loading$.subscribe(data => {
      this.isLoading = data;
    })
    error$.subscribe(data => {
      this.error = data;
    })
    postData$.subscribe(data => {
      this.posts = data;
    });
  }

  tryAgain() {
    this.dummyRepository.getPostsList(true);
  }
}
