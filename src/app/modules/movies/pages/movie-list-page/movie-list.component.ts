import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MoviesService } from '../../service/movies.service';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/core/models/movie.model';
import { DetailsComponent } from '@shared/components/details/details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent, MatDialogModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{

  movies: Movie[] = [];

  constructor(private moviesService: MoviesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data;
      //console.log(data);
      //console.log(this.movies);
    });
  }

  openDialog(movie: Movie): void {
    this.dialog.open(DetailsComponent, {
      width: '800px',
      data: movie
    });
  }
}
