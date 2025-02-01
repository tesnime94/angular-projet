import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private userService: UserService) {}

  // Méthode pour gérer la connexion en utilisant UserService
  login(email: string, password: string): Observable<number> {
    return this.userService.login(email, password).pipe(
      tap((userId) => {
        if (userId !== 0) {
          localStorage.setItem('userId', userId.toString()); // Stocker l'ID utilisateur
        }
      })
    );
  }

  // Méthode pour gérer la déconnexion
  logout(): void {
    localStorage.removeItem('userId'); // Supprimer l'utilisateur connecté
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  // Vérifier si un utilisateur est connecté
  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }
}
