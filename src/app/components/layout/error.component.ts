import { EventEmitter } from "@angular/core";
import {Component, Output} from "@angular/core";

@Component({
  selector: "app-error",
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="20px">
    <mat-icon>error_outline</mat-icon>
    <span>Error Occured!</span>
    <button (click)="reload.next()" mat-raised-button color="warn">Try Again</button>
    </div>
  `,
  styles: [`
  `]
})

export class ErrorComponent {

  @Output() reload = new EventEmitter();

}
