import {Component, OnDestroy, OnInit} from "@angular/core";
import {PostModel} from "../models/post.model";
import {DummyRepository} from "../services/dummy.repository";
import {takeWhile} from "rxjs/operators";

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

export class PostComponent implements OnInit, OnDestroy {

  posts: PostModel[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  isAlive = true;

  constructor(private dummyRepository: DummyRepository) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchPosts() {
    const observer$ = this.dummyRepository.getPostsList();
    const loading$ = observer$[0];
    const postData$ = observer$[1];
    const error$ = observer$[2];
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.isLoading = data;
    })
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    })
    postData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.posts = data;
    });
  }

  tryAgain() {
    this.dummyRepository.getPostsList(true);
  }
}
