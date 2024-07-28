import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { UserService } from '@modules/auth/service/user.service';


@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
    
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    // Eliminar los datos de autenticación del localStorage
    this.userService.logout();
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/auth/login']);
  }
}
