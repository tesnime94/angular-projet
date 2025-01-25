import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

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
    private fb: FormBuilder, // Utilisation de FormBuilder pour simplifier la création du formulaire
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire réactif
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

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
      this.loginForm.markAllAsTouched(); // Marquer les champs comme touchés pour afficher les erreurs
    }
  }

  public navigateToInscription(): void {
    this.router.navigate(['/inscription']);
  }
}
