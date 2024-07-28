import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favorites-page.component';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '@modules/auth/service/user.service';
import { FavoritesService } from '@modules/favorites/service/favorites.service';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPageComponent,
        HttpClientTestingModule,
        CommonModule,
        HeaderComponent,
        FooterComponent,
        MatDialogModule
      ],
      providers: [
        FavoritesService,
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => ({ Nombre: 'John', Apellido: 'Doe' })
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => null }) 
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
