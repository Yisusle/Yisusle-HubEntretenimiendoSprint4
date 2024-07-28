import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPageComponent } from './series-page.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SeriesService } from '@modules/series/service/series.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '@modules/auth/service/user.service';

describe('SeriesPageComponent', () => {
  let component: SeriesPageComponent;
  let fixture: ComponentFixture<SeriesPageComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesPageComponent,
        CommonModule,
        HttpClientTestingModule,
        HeaderComponent,
        FooterComponent,
        MatDialogModule,
      ],
      providers: [
        SeriesService,
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

    fixture = TestBed.createComponent(SeriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
