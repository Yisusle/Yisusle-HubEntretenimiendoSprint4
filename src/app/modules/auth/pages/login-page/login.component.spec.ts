import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@modules/auth/service/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const authSpy = jasmine.createSpyObj('AuthService', ['loginUser']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent,
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
      ],providers: [
        { provide: AuthService, useValue: authSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });


  it('should show alert of failed', () => {
    const alertSpy = spyOn(window, 'alert');
    authServiceSpy.loginUser.and.returnValue(throwError(() => new Error('Login failed')));

    component.signinEmail = 'fak@fake.com';
    component.signinPassword = 'wrongpassword';
    component.onSignIn();

    expect(authServiceSpy.loginUser.calls.count()).toBe(1, 'loginUser called once');
    expect(alertSpy).toHaveBeenCalledWith('Correo o contraseña incorrectos');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to sign up view', () => {
    component.showSignUp();
    expect(component.isSignIn).toBeFalse();
  });

  it('should switch to sign in view', () => {
    component.showSignIn();
    expect(component.isSignIn).toBeTrue();
  });

});
