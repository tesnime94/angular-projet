import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // On utilise AuthService maintenant
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response !== 0) {
            this.router.navigate(['/dress']); // Redirection après connexion réussie
          } else {
            alert('Identifiants incorrects');
          }
        },
        error: () => {
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public navigateToInscription(): void {
    this.router.navigate(['/inscription']);
  }
}
