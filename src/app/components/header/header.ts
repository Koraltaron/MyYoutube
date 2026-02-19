import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);

  isAuth: Signal<boolean> = this.authService.isAuthenticated;

  onClickLogout() {
    this.authService.logout();
  }
}
