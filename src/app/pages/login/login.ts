import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  username: string = "";
  password: string = "";
  isClicked: boolean = false;

  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, ]),
      password: new FormControl('', [Validators.required, ])
    },
    {
      validators: [this.credentialsValidator.bind(this)]
    }
  )

  onClick(){
    this.isClicked = !this.isClicked;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    const isValid = this.authService.checkUser({
      username: username!,
      password: password!
    });
    isValid ? this.router.navigate(['/']) : this.router.navigate(['/register']);

  }

  credentialsValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.get('username')?.value;
    const password = control.get('password')?.value;
    
    if(!username || !password) {
      return null;
    }

    const isValid = this.authService.checkUser({username, password})

    return isValid ? null : { invalidCredentials: true };
  }
}
