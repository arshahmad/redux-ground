import {Component, Input} from "@angular/core";
import {PostModel} from "../models/post.model";

@Component({
  selector: "app-post-card",
  template: `
    <mat-card>
      <mat-card-title>{{post.id}}</mat-card-title>
      <h4>User Id: {{post.userId}}</h4>
      <h4>Title: {{post.title}}</h4>
      <h4>Body: {{post.body}}</h4>
    </mat-card>`,
  styles: [`
    mat-card {
      margin: 15px;
      width: 250px;
      height: 300px;
    }`]
})

export class PostCardComponent {
  // @ts-ignore
  @Input() post: PostModel;
}
