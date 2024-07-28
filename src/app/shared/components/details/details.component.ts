import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FavoritesService } from '@modules/favorites/service/favorites.service';
import { Movie } from 'src/app/core/models/movie.model';
import { Serie } from 'src/app/core/models/series.model';
import { FavoriteItem } from 'src/app/core/models/shared.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  dialog: any;
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private favoritesService: FavoritesService
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  addToFavorites(): void {
    this.favoritesService.addFavorite({
      id: this.data.id,
      title: this.data.title,
      poster: this.data.poster,
      type: 'movie' in this.data ? 'movie' : 'series'
    });
  }

}
