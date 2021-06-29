import {Component, OnDestroy, OnInit} from "@angular/core";
import {UserModel} from "../models/user.model";
import {DummyRepository} from "../services/dummy.repository";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: "app-dummy-users",
  template: `
    <div class="container">
      <div *ngIf="!isLoading && !error">
        <app-user-list [Users]="users"></app-user-list>
      </div>
      <div class="spinner" *ngIf="isLoading">
        <mat-spinner></mat-spinner>
      </div>
      <div *ngIf="error && !isLoading" fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="20px">
        <app-error (reload)="tryAgain()"></app-error>
      </div>
    </div>`,
  styles: [`

    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    app-user-list {
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

export class DummyUsersComponent implements OnInit, OnDestroy{

  users: UserModel[] = [];
  isLoading: boolean = false;
  error: boolean = false;
  isAlive = true;

  constructor(
    private dummyRepository: DummyRepository
  ) {
  }

  ngOnInit() {
    this.fetchUsersList();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchUsersList() {
    const observer$ = this.dummyRepository.getUsersList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.isLoading = data;
    })
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    })
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.users = data;
    })
  }

  tryAgain() {
    this.dummyRepository.getUsersList(true);
  }
}
