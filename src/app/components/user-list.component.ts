import {Component, Input} from "@angular/core";
import {UserModel} from "../models/user.model";

@Component({
  selector: "app-user-list",
  template: `
  <div class="list" *ngFor="let user of Users">
  <app-user-card [user]="user"></app-user-card>
  </div>
  `,
  styles: [`
    .list {
      display: flex;
      flex-direction: row;
    }
  `]
})

export class userListComponent {

  @Input() Users: UserModel[] = [];
  constructor() {

  }
}
