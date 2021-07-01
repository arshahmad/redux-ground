import {Component, OnDestroy, OnInit} from "@angular/core";
import {DummyRepository} from "../services/dummy.repository";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, takeWhile} from "rxjs/operators";
import {UserModel} from "../models/user.model";

@Component({
  selector: "app-view-user",
  template: `<mat-card>
    <mat-card-title>{{user?.name || 'name'}}</mat-card-title>
    <h4>{{user?.email || "email"}}</h4>
  </mat-card>`,
  styles: [`
    mat-card {
      margin: 15px;
      width: 250px;
      height: 200px;
    }`]
})

export class ViewUserComponent implements OnInit, OnDestroy {

  isAlive = true;
  // @ts-ignore
  user: UserModel;
constructor(private dummyRepository: DummyRepository,
            private activatedRoute: ActivatedRoute) {
}

ngOnInit() {
this.fetchUser();
}

ngOnDestroy() {
  this.isAlive = false;
}

  fetchUser() {
  const user$ = this.activatedRoute.params.pipe(map(data => data.id),takeWhile(() => this.isAlive), switchMap((id) => {
    return this.dummyRepository.getUserById(id);
  }), filter(res => !!res));

  user$.subscribe(data=>{
    this.user = data;
  })
}


}
