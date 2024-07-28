import { Component, Inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { GenresService } from '@modules/genres/service/genres.service';
import { Movie } from 'src/app/core/models/movie.model';
import { Serie } from 'src/app/core/models/series.model';
import { DetailsComponent } from '@shared/components/details/details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-genres-page',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent],
  templateUrl: './genres-page.component.html',
  styleUrl: './genres-page.component.css'
})
export class GenresPageComponent implements OnInit {
  
  genres: { [key: string]: any[] } = {};

  constructor(private genreService: GenresService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
      ///console.log('Genres:', genres); 
    });
  }

  openDialog(item: Movie | Serie): void {
    this.dialog.open(DetailsComponent, {
      width: '800px',
      data: item
    });
  }
}
