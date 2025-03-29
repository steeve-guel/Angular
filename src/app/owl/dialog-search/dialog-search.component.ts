import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { OwlServicesService } from '../../_services/owl-services.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-dialog-search',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTabsModule,
    MatExpansionModule
  ],
  templateUrl: './dialog-search.component.html',
  styleUrl: './dialog-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSearchComponent {
  readonly data = inject(MAT_DIALOG_DATA);

  readonly panelOpenState = signal(false);

  sousClass: string[] | undefined;
  parentClass: string[] | undefined;
  instance: string[] | undefined;

  relation:any;

  constructor(private owlServices: OwlServicesService) { }

  ngOnInit() {
    this.executeQueryClasse();
    this.executeQuerryParentClass();
    this.executeQuerryInstance();
    this.executeQuerryRelation();
  }

  //Recuperation des sous-classes
  executeQueryClasse() {
    let query: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?subClass WHERE {
      ?subClass rdfs:subClassOf ex:${this.data.value} .
    }
  `;

    this.owlServices.executeQuery(query).subscribe(
      {
        next: (data: any) => {

          this.sousClass = this.extractValues(data, "subClass");
        },
        error: () => {

        }
      }
    )
  }

  //Recuperation des classes parentes
  executeQuerryParentClass() {
    let query: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?parentClass WHERE {
      ex:${this.data.value} rdfs:subClassOf ?parentClass .
      FILTER (!isBlank(?parentClass))
    }
  `;

    this.owlServices.executeQuery(query).subscribe(
      {
        next: (data: any) => {
          this.parentClass = this.extractValues(data, "parentClass");

        },
        error: () => {

        }
      }
    );
  }


  executeQuerryInstance() {

    let query: string = `
      PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

      SELECT ?instance WHERE {
        ?instance a ex:${this.data.value} .
      }
  `;

    this.owlServices.executeQuery(query).subscribe(
      {
        next: (data: any) => {
          this.instance = this.extractValues(data, "instance");

        },
        error: () => {

        }
      }
    )
  }

  //Relation entre les instances
  executeQuerryRelation() {

    let query: string = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

      SELECT ?instance ?property ?value WHERE {
        ?instance a ex:${this.data.value} ;
                  ?property ?value .
        FILTER (?property != rdf:type)  # Exclusion directe
      }
  `;

    this.owlServices.executeQuery(query).subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.relation = data;
        },
        error: () => {

        }
      }
    )
  }

  extractValues(data: any, key: string): string[] {
    let listClass: string[] = [];
    data.results.bindings.forEach((owlClass: any) => {
      listClass.push(owlClass[key].value.split('#')[1])
    });
    return listClass;
  }
}
