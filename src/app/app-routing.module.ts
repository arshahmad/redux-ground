import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/layout/dashboard.component";
import {UsersComponent} from "./containers/users.component";
import {PostComponent} from "./containers/post.component";
import {DummyUsersComponent} from "./containers/dummy-users.component";
import {ViewUserComponent} from "./containers/view-user.component";


const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    {path:'', component: UsersComponent},
    {path:'user/:id', component: ViewUserComponent},
    {path: 'post', component: PostComponent},
    {path:'dummy-users', component: DummyUsersComponent},
  ]
}]

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
