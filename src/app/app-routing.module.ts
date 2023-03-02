import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { MyListComponent } from './components/my-list/my-list.component';
import { FindMoviesComponent } from './components/find-movies/find-movies.component';
import { LoginComponent } from './components/login/login.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';

const routes: Routes = [
  { path: '', component: MyListComponent},
  { path: 'watch', component: MyListComponent},
  { path: 'find', component: FindMoviesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'movie/:id', component: MovieInfoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
