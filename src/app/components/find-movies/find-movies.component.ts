import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OmdbService } from "../../services/omdb.service";
import {
  SafeHtml,
  SafeUrl,
  SafeStyle,
  DomSanitizer
} from '@angular/platform-browser';
@Component({
  selector: 'app-find-movies',
  templateUrl: './find-movies.component.html',
  styleUrls: ['./find-movies.component.css']
})


export class FindMoviesComponent implements OnInit {
  response : any = {}
  movies : any[] = [];
  foundMovies : any[] = [];
  constructor(private omdb: OmdbService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.findMovies('batman')
  }

  findMovies(title: string){
    this.omdb.findMovies(title).subscribe((res : movie[]) =>{
      console.log(res)
      this.foundMovies = Array.from(res);
    })
  }

  sanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url); 
  }
}
export interface movie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
}