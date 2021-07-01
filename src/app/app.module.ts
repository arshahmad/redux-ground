import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DashboardComponent} from "./components/layout/dashboard.component";
import {HeaderComponent} from "./components/layout/header.component";
import {YoutubeLayoutComponent} from "./components/layout/youtube-layout.component";
import {UsersComponent} from "./containers/users.component";
import {PostComponent} from "./containers/post.component";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {ApiService} from "./services/api.service";
import {UserCardComponent} from "./components/user-card.component";
import {userListComponent} from "./components/user-list.component";
import {PostListComponent} from "./components/post-list.component";
import {PostCardComponent} from "./components/post-card.component";
import { StoreModule } from '@ngrx/store';
import {rootReducer} from "./reducers";
import {DummyRepository} from "./services/dummy.repository";
import {ErrorComponent} from "./components/layout/error.component";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {DummyUsersComponent} from "./containers/dummy-users.component";
import {UpdateUserComponent} from "./components/update-user.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ViewUserComponent} from "./containers/view-user.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    YoutubeLayoutComponent,
    UsersComponent,
    PostComponent,
    UserCardComponent,
    userListComponent,
    PostListComponent,
    PostCardComponent,
    ErrorComponent,
    DummyUsersComponent,
    UpdateUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [HttpService, ApiService, DummyRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
