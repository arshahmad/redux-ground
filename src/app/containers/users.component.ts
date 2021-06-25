import {Component, OnInit} from "@angular/core";
import {UserModel} from "../models/user.model";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-users',
  template: `
    <div class="container">
    <app-user-list [Users]="users"></app-user-list>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }
    app-user-list {
      display: flex;
      flex-wrap: wrap;
    }
  `]
})


export class UsersComponent implements OnInit {
  users: UserModel[] = [];

constructor(private usersService: UsersService
            ) {
}

ngOnInit() {
  this.fetchUsersList();
}

fetchUsersList() {
const userData$ = this.usersService.getUsersList()[1];
userData$.subscribe(data => {
  this.users = data;
})
}
}
