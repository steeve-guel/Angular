import { BrowserModule } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OwlServicesService } from '../../_services/owl-services.service';

@Component({
  selector: 'app-gestion-utilisateurs',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrl: './gestion-utilisateurs.component.scss'
})
export class GestionUtilisateursComponent {

  query: string = `
  SELECT ?s WHERE { ?s a <http://www.w3.org/2002/07/owl#Class> }
`;
  results: any;

  constructor(private owlServices:OwlServicesService){}

  executeQuery() {
    this.owlServices.executeQuery(this.query).subscribe(
      (data) => {
        this.results = data;
        console.log(data); // Affiche les résultats dans la console
      },
      (error) => {
        console.error('Erreur lors de la requête SPARQL :', error);
      }
    );
  }
}
