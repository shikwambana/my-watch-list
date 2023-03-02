import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OmdbService } from "../../services/omdb.service";
import {
  SafeHtml,
  SafeUrl,
  SafeStyle,
  DomSanitizer
} from '@angular/platform-browser';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-movies',
  templateUrl: './find-movies.component.html',
  styleUrls: ['./find-movies.component.css']
})


export class FindMoviesComponent implements OnInit {
  response : any = {}
  movies : any[] = [];
  foundMovies : any[] = [];
  constructor(private fb: FirebaseService,private omdb: OmdbService, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(!this.fb.getUser()){
      this.fb.openSnackBar('Please Login First')
      this.route.navigate(['/login']);
    }
    
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