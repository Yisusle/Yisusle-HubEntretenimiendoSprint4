import { TestBed } from '@angular/core/testing';

import { GenresService } from './genres.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('GenresService', () => {
  let service: GenresService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(GenresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should group items by genre', () => {
    const movies = [
      { id: 1, title: 'Inception', genre: 'Sci-Fi' },
      { id: 2, title: 'The Dark Knight', genre: 'Action' }
    ];
    const series = [
      { id: 1, title: 'Breaking Bad', genre: 'Crime' },
      { id: 2, title: 'Game of Thrones', genre: 'Fantasy' }
    ];

    service.getGenres().subscribe(genres => {
      expect(genres['Sci-Fi']).toEqual([movies[0]]);
      expect(genres['Action']).toEqual([movies[1]]);
      expect(genres['Crime']).toEqual([series[0]]);
      expect(genres['Fantasy']).toEqual([series[1]]);
    });

    const moviesReq = httpMock.expectOne(`${service['apiUrl']}/movies`);
    expect(moviesReq.request.method).toBe('GET');
    moviesReq.flush(movies);

    const seriesReq = httpMock.expectOne(`${service['apiUrl']}/series`);
    expect(seriesReq.request.method).toBe('GET');
    seriesReq.flush(series);
  });

});
