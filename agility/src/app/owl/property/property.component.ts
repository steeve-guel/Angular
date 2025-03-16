import { Component } from '@angular/core';
import { OwlServicesService } from '../../_services/owl-services.service';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent {

  query: string = `

      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT ?class WHERE {
        ?class a owl:Class .
        FILTER (!isBlank(?class))
      }
    `;
  results: any;

  data: any;

  constructor(private owlServices: OwlServicesService) { }

  ngOnInit() {
    this.executeQuery();
  }

  // formatResults(results: any): string[] {
  //   return results.map((result: any) => {
  //     const uri = result.instance.value; // L'URI complète
  //     return uri.split('#')[1]; // Extrait le nom après #
  //   });
  // }

  extractValues(data: any): string[] {
    return data.results.bindings.map((binding: any) => {
      // Extrait la partie après '#' dans la valeur de la variable 's'
      return binding.s.value.split('#')[1];
    });
  }
  executeQuery() {
    this.owlServices.executeQuery(this.query).subscribe(
      {
        next: (data) => {
          this.results = data;
          this.data = data.results.bindings;

          console.log(data); // Affiche les résultats dans la console
          console.log(data.results.bindings[0].s.value.split('#')[1]); // Affiche les résultats dans la console
          console.log(this.results.head.vars);
          console.log(this.extractValues(data))
        },
        error: (error) => {
          console.error('Erreur lors de la requête SPARQL :', error);
        }
      }
    );
  }
}
