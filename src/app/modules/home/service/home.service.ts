import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Movie } from 'src/app/core/models/movie.model';
import { Serie } from 'src/app/core/models/series.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movies`); 
  }

  getSeries(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/series`);
  }
  
  getItems(): Observable<{ movies: Movie[], series: Serie[] }> {
    return forkJoin({
      movies: this.getMovies(),
      series: this.getSeries()
    });
  }
}
