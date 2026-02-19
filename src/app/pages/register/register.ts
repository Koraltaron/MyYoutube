import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService, UserInterface } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username: string = "";
  email: string = "";
  password: string = "";
  isClicked: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(String.raw`^(?=.*[A-Za-z])(?=.*\d).{8,}$`)]),
  })

  onClick(){
    this.isClicked = !this.isClicked;
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const userData = this.registerForm.value as UserInterface;
      this.authService.register(userData);
      this.router.navigate(['/login']);
    }
  }
}
