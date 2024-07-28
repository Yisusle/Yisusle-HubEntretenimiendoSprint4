import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '@modules/auth/service/user.service';
import { CommonModule } from '@angular/common';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent,
        CommonModule,
      
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => ({ Nombre: 'Test', Apellido: 'Test' }),
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (param: string) => null })
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
