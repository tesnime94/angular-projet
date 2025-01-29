import {Component, OnInit} from '@angular/core';
import {DressService} from '../services/dress.service';
import {Router} from '@angular/router';
import {DressModel} from '../models/dress-model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dress.component.html',
  styleUrl: './dress.component.css'
})
export class DressComponent implements OnInit{
  dresses: DressModel[] = [];

  constructor(private dressService: DressService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === 'false') {
      this.router.navigate(['/login']);
    } else {
      this.fetchDresses();
    }
  }

  fetchDresses(): void {
    this.dressService.getAllDresses().subscribe(
      (response) => {
        this.dresses = response;
      },
      (error) => console.error(error)
    );
  }

  addToCart(id: number): void {
    const userId = localStorage.getItem('userId') || '';
    this.dressService.addToCart(userId, id).subscribe(
      () => alert('Produit ajouté au panier avec succès !'),
      (error) => {
        console.error('Erreur lors de l\'ajout au panier :', error);
        alert('Une erreur est survenue lors de l\'ajout au panier.');
      }
    );
  }

  navigateToAddDress(): void {
    this.router.navigate(['/addDress']);
  }
}
