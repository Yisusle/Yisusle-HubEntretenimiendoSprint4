import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn = true;
  signinEmail = '';
  signinPassword = '';
  signupName = '';
  signupLastName = '';
  signupEmail = '';
  signupPassword = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  showSignIn() {
    this.isSignIn = true;
  }

  showSignUp() {
    this.isSignIn = false;
  }

  onSignIn() {
    const credentials = {
      Correo: this.signinEmail,
      Contraseña: this.signinPassword
    };

    this.authService.loginUser(credentials).subscribe(response => {
      console.log('Login Correcto: ', response);
      // Generar un token aleatorio
      const token = this.generateRandomToken();
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      
      //console.log('Token guardado en localStorage:', localStorage.getItem('token'));
      //console.log('Usuario guardado en localStorage:', localStorage.getItem('currentUser'));
      
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error al iniciar sesión: ', error);
      alert("Correo o contraseña incorrectos");
    });
  }

  onSignUp() {
      const newUser = {
        Nombre: this.signupName,
        Apellido: this.signupLastName,
        Correo: this.signupEmail,
        Contraseña: this.signupPassword
      };
  
      this.authService.registerUser(newUser).subscribe(response => {
        console.log('Usuario registrado:', response);
        alert("Usuario Registrado Exitosamente");
        this.isSignIn = true;
        this.signupName = '';
        this.signupLastName = '';
        this.signupEmail = '';
        this.signupPassword = '';
      }, error => {
        console.error('Error registrar Usuario: ', error.message);
      });
      
  }

    private generateRandomToken(): string {
      return Math.random().toString(36).substr(10);
    }
}
