import {Component, Inject, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserModel} from "../models/user.model";
import {DummyRepository} from "../services/dummy.repository";

@Component({
  selector: "app-update-user",
  template: `
  <form [formGroup]="form" class="input-form" (ngSubmit)="form.valid && updateOrAddUser()">
    <mat-icon color="warn" (click)="onNoClick()">close</mat-icon>
    <mat-form-field>
      <input formControlName="email" matInput placeholder="Email"/>
      <mat-error>Valid email is required</mat-error>
    </mat-form-field>
    <mat-form-field>
      <input formControlName="name" matInput placeholder="UserName"/>
      <mat-error>Name is required</mat-error>
    </mat-form-field>
    <button mat-raised-button color="accent" type="submit">{{this.data ? 'Update' : 'Add'}}</button>
  </form>
  `,
  styles: [`
  .input-form {
    display: flex;
    flex-direction: column;
  }
  mat-form-field {
    margin: 5px;
  }
  `],
})

export class UpdateUserComponent implements OnInit {

  controls = {
    email: new FormControl(null, Validators.email),
    name: new FormControl(null, Validators.required)
  }
  form = new FormGroup(this.controls);

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserModel,
              private dummyRepository: DummyRepository) {

  }

  ngOnInit() {
    this.controls.name.setValue(this.data ? this.data.name : null)
    this.controls.email.setValue(this.data ? this.data.email : null)
  }

  updateOrAddUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.form.value}
    this.dummyRepository.updateUser(updatedUser);
    this.dialogRef.close();
  }

  addUser() {
    const user = this.form.value;
    this.dummyRepository.addUser(user);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
