import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {}

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log('Tentative de connexion avec :', email, password);

      this.userService.login(email as string, password as string).subscribe({
        next: (response) => {
          console.log('Réponse du backend :', response);
          if (response !== 0) {
            // Stockez l'ID utilisateur dans le localStorage
            localStorage.setItem('userId', response.toString());

            // Redirigez vers la page des robes
            this.router.navigate(['/dress']);
          } else {
            console.error('Authentification échouée');
            alert('Identifiants incorrects');
          }
        },
        error: (error) => {
          console.error('Erreur lors de la connexion :', error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        },
      });
    } else {
      console.log('Formulaire invalide');
      this.loginForm.markAllAsTouched(); // Affiche les erreurs si le formulaire est invalide
    }
  }

  public navigateToInscription(): void {
    this.router.navigate(['/inscription']);
  }
}
