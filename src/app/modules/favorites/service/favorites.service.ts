import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@modules/auth/service/user.service';
import { BehaviorSubject } from 'rxjs';
import { FavoriteItem } from 'src/app/core/models/shared.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

    private favorites = new BehaviorSubject<FavoriteItem[]>([]);
    favorites$ = this.favorites.asObservable();

    addFavorite(item: FavoriteItem) {
      const currentFavorites = this.favorites.getValue();
      if (!currentFavorites.find(fav => fav.id === item.id)) {
        this.favorites.next([...currentFavorites, item]);
      }
    }

    removeFavorite(itemId: number) {
      const currentFavorites = this.favorites.getValue();
      this.favorites.next(currentFavorites.filter(item => item.id !== itemId));
    }

    getFavorites(): FavoriteItem[] {
      return this.favorites.getValue();
    }
    
  }