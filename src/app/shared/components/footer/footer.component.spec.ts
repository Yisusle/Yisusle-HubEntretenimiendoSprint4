import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GenresPageComponent } from '@modules/genres/pages/genres-page/genres-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GenresService } from '@modules/genres/service/genres.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent,
        CommonModule,
        HttpClientTestingModule,
        HeaderComponent,
        FooterComponent,
        MatDialogModule,
        GenresPageComponent,
      ],
      providers: [
        GenresService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => null }) // Mocking paramMap with an observable
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
