import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OmdbService } from "../../services/omdb.service";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  movieID: string | undefined;
  info: any = {}

  constructor(private omdb: OmdbService, private route: Router, private activeRoute: ActivatedRoute) { 
    this.movieID = this.route.url.split('?')[0].split('/').pop()
  }

  ngOnInit(): void {
    this.getMovieInfo()
  }

  getMovieInfo(){
    this.omdb.getMovieInfo(this.movieID)
    .subscribe(res =>{
      console.log(res)
      this.info = res;
    })
  }

}
