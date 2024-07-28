import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { FavoriteItem } from 'src/app/core/models/shared.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite item', () => {
    const item: FavoriteItem = { id: 1, title: 'Test Movie', poster: 'test-poster.jpg', type: 'movie' };
    service.addFavorite(item);
    service.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(1);
      expect(favorites).toContain(item);
    });
  });


  it('should remove a favorite item', () => {
    const item1: FavoriteItem = { id: 1, title: 'Test Movie', poster: 'test-poster.jpg', type: 'movie' };
    const item2: FavoriteItem = { id: 2, title: 'Test Series', poster: 'test-poster2.jpg', type: 'series' };
    service.addFavorite(item1);
    service.addFavorite(item2);
    service.removeFavorite(item1.id);
    service.favorites$.subscribe(favorites => {
      expect(favorites.length).toBe(1);
      expect(favorites).not.toContain(item1);
      expect(favorites).toContain(item2);
    });
  });
  
});
