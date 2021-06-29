import {Component, Input} from "@angular/core";
import {UserModel} from "../models/user.model";
import {DummyRepository} from "../services/dummy.repository";
import {MatDialog} from "@angular/material/dialog";
import {UpdateUserComponent} from "./update-user.component";

@Component({
  selector: "app-user-card",
  template: `
    <mat-card>
      <mat-card-title>{{user.name}}</mat-card-title>
      <h4>{{user.email}}</h4>
<!--      <h4>{{user.website}}</h4>-->
<!--      <h4>{{user.phone}}</h4>-->
      <button mat-raised-button color="warn" (click)="deleteUser(user.id)">Delete</button>
      <button mat-raised-button color="primary" (click)="editUser()">Edit</button>
    </mat-card>
    `,
  styles: [`
  mat-card {
    margin: 15px;
    width: 250px;
    height: 200px;
  }
  button {
    margin: 5px;
  }

  `]
})

export class UserCardComponent {
  // @ts-ignore
  @Input() user: UserModel;
constructor(private dummyRepository: DummyRepository,
            private dialog: MatDialog) {
}

deleteUser(id: number) {
  this.dummyRepository.deleteUser(id);
}

editUser() {
  const dialogRef = this.dialog.open(UpdateUserComponent, {
    width: '250px',
    height: '250px',
    data: this.user
  });
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   this.user = result;
  // });
}

}
