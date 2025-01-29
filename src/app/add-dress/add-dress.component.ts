import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import axios from 'axios';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-dress',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-dress.component.html',
  styleUrl: './add-dress.component.css'
})
export class AddDressComponent {
  public dressForm: FormGroup; // Déclaration du formulaire
  public selectedFile: File | null = null; // Pour le fichier image

  constructor(
    private fb: FormBuilder, // Utilisation de FormBuilder pour simplifier la déclaration
    private router: Router
  ) {
    // Initialisation du formulaire
    this.dressForm = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Prix doit être un nombre
      image: [''] // Champ pour l'image (non obligatoire)
    });
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.dressForm.valid) {
      const formData = new FormData();
      const formValues = this.dressForm.value;

      // Ajouter les champs du formulaire au FormData
      formData.append('label', formValues.label);
      formData.append('description', formValues.description);
      formData.append('size', formValues.size);
      formData.append('price', formValues.price);

      // Ajouter l'image si elle est sélectionnée
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Ajouter l'userId depuis le localStorage
      const userId = localStorage.getItem('userId');
      if (userId) {
        formData.append('userId', userId);
      }

      try {
        const response = await axios.post('http://localhost:8080/robe/add', formData);
        console.log('Robe ajoutée avec succès :', response);
        this.router.navigate(['/dress']);
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la robe :', error);
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    } else {
      console.log('Formulaire invalide');
      this.dressForm.markAllAsTouched(); // Affiche les erreurs si le formulaire est invalide
    }
  }
}
