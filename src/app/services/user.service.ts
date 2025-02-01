import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; // URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer les données du formulaire au backend
  registerUser(data: any): Observable<any> {
    console.log('Envoi des données au backend :', data); // Vérifiez que les données arrivent ici
    return this.http.post(this.apiUrl, data);
  }

  login(email: string, password: string): Observable<number> {
    const url = `${this.apiUrl}/login?email=${email}&password=${password}`;
    return this.http.get<number>(url); // Retourne un Observable du type attendu
  }
}
