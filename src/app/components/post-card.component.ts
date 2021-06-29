import {Component, Input} from "@angular/core";
import {PostModel} from "../models/post.model";
import {DummyRepository} from "../services/dummy.repository";

@Component({
  selector: "app-post-card",
  template: `
    <mat-card>
      <mat-card-title>{{post.id}}</mat-card-title>
      <h4>User Id: {{post.userId}}</h4>
      <h4>Title: {{post.title}}</h4>
      <h4>Body: {{post.body}}</h4>
      <button mat-raised-button color="warn" (click)="deletePost(post.id)">Delete</button>
      <button mat-raised-button color="primary">Edit</button>
    </mat-card>`,
  styles: [`
    mat-card {
      margin: 15px;
      width: 250px;
      height: 400px;
    }
    button {
      margin: 5px;
    }
  `]
})

export class PostCardComponent {
  // @ts-ignore
  @Input() post: PostModel;
  constructor(private dummyRepository: DummyRepository) {
  }

  deletePost(id: number) {
    this.dummyRepository.deletePost(id);
  }
}
