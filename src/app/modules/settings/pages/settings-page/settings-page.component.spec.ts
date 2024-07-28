import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '@modules/auth/service/user.service';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPageComponent,
        CommonModule,
        HeaderComponent,
        FooterComponent,
      ],
      providers: [
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

    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
