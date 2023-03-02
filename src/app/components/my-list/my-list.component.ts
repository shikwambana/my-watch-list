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
        console.log(res)
        this.foundMovies = res
      })
  }
}
