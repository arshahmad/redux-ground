import {Component, Input} from "@angular/core";
import {UserModel} from "../models/user.model";

@Component({
  selector: "app-user-card",
  template: `
    <mat-card>
      <mat-card-title>{{user.name}}</mat-card-title>
      <h4>{{user.email}}</h4>
      <h4>{{user.website}}</h4>
      <h4>{{user.phone}}</h4>
    </mat-card>
    `,
  styles: [`
  mat-card {
    margin: 15px;
    width: 250px;
    height: 150px;
  }
  `]
})

export class UserCardComponent {
  // @ts-ignore
  @Input() user: UserModel;
constructor() {
}
}
