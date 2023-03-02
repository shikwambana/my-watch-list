import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  url: string = '';
  apiKey: string = '';

  constructor(private http: HttpClient) {
    this.url = environment.omdbUrl;
    this.apiKey = environment.omdbApiKey;
   }

   findMovies(title: string, page: string = '1'){
    return this.http.get<any[]>(this.url + '/?s=' + title + '&plot=short&page=' + page + '&apikey=' + this.apiKey)
    .pipe(map( (res : any) => res['Search']) )
   }

   getMovieInfo(movieID: string){
    return this.http.get(this.url + '/?i=' + movieID + '&apikey=' + this.apiKey)
   }
}
