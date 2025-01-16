import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  public registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birth: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private userService: UserService, private router: Router) {
  }

  public onSubmit(): void {
    console.log('onSubmit déclenché'); // Vérifiez si ce message s'affiche
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
        },
      });
    } else {
      console.log("erreur d'envoi du form"); // Vérifiez si ce message s'affiche
      this.registerForm.markAllAsTouched(); // Affiche les erreurs si le formulaire est invalide
    }
  }
}
