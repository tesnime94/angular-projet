import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, // Utilisation de FormBuilder pour créer le formulaire
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire réactif
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birth: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Données soumises :', formData);

      // Utilisation du service pour envoyer les données
      this.userService.registerUser(formData).subscribe({
        next: (response) => {
          console.log('Inscription réussie :', response);
          this.router.navigate(['/login']); // Redirection après succès
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription :", error);
        }
      });
    } else {
      console.log("Erreur : le formulaire est invalide");
      this.registerForm.markAllAsTouched(); // Marque tous les champs comme touchés pour afficher les erreurs
    }
  }
}
