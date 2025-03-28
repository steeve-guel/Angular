import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { OwlServicesService } from '../../_services/owl-services.service';

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
    MatTabsModule
  ],
  templateUrl: './dialog-search.component.html',
  styleUrl: './dialog-search.component.scss'
})
export class DialogSearchComponent {
  readonly data = inject(MAT_DIALOG_DATA);

  sousClass: string[] | undefined;
  parentClass : string[] | undefined;

  constructor(private owlServices: OwlServicesService) { }

  ngOnInit() {
    this.executeQueryClasse();
    this.executeQuerryParentClass();
  }

  //Recuperation des sous-classes
  executeQueryClasse() {
    let query1: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?subClass WHERE {
      ?subClass rdfs:subClassOf ex:${this.data.value} .
    }
  `;

    this.owlServices.executeQuery(query1).subscribe(
      {
        next: (data: any) => {

          this.sousClass = this.extractValues(data, "subClass");
          console.log(data);
        },
        error: () => {

        }
      }
    )
  }

  //Recuperation des classes parentes
  executeQuerryParentClass() {
    let query2: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?parentClass WHERE {
      ex:${this.data.value} rdfs:subClassOf ?parentClass .
      FILTER (!isBlank(?parentClass))
    }
  `;

  this.owlServices.executeQuery(query2).subscribe(
    {
      next:(data:any)=>{
          this.parentClass = this.extractValues(data,"parentClass");

      },
      error:()=>{

      }
    }
  )
  }


  executeQuerryInstance() {

    let query2: string = `
      PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

      SELECT ?instance WHERE {
        ?instance a ex:${this.data.class} .
      }
  `;
  }

  extractValues(data: any, key: string): string[] {
    let listClass: string[] = [];
    data.results.bindings.forEach((owlClass: any) => {
      listClass.push(owlClass[key].value.split('#')[1])
    });
    return listClass;
  }
}
