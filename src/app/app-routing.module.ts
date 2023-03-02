import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { MyListComponent } from './components/my-list/my-list.component';
import { FindMoviesComponent } from './components/find-movies/find-movies.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: MyListComponent},
  { path: 'find', component: FindMoviesComponent},
  { path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
