import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  user: any = {}
  foundMovies : any[] = [];

  constructor(private fb: FirebaseService) { }

  ngOnInit(): void {
    if(this.fb.getUser()){
      this.user = this.fb.getUser()

      this.fetchMovies();   

    }
  }

  fetchMovies(){
    this.fb.fetchObject(this.user['uid'],'uid','movies',true)
      .then((res : any) =>{
        if(res == 'no-data'){
          this.foundMovies = []
          
        }else{
          this.foundMovies = res
        }
        
      })
  }

  deleteMovie(movie: any){
      this.fb.deleteObject(this.user['uid'],'uid',movie,'movies')
        .then(res =>{
          this.fb.openSnackBar('Movie Deleted');
          this.fetchMovies()
        })
  }
}
