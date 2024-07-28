import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MoviesService } from '@modules/movies/service/movies.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '@modules/auth/service/user.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent,
        HttpClientTestingModule,
        CommonModule,
        HeaderComponent,
        FooterComponent,
        MatDialogModule,
      ],
      providers: [
        MoviesService,
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => ({ Nombre: 'Test', Apellido: 'Test' })
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

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
