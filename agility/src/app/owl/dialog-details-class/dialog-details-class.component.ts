import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OwlServicesService } from '../../_services/owl-services.service';

@Component({
  selector: 'app-dialog-details-class',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-details-class.component.html',
  styleUrl: './dialog-details-class.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDetailsClassComponent {
  data = inject(MAT_DIALOG_DATA);
  subClass: string[] = [];
  parenClass: string[] = [];

  constructor(private owlServices: OwlServicesService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.data);

    let query1: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?subClass WHERE {
      ?subClass rdfs:subClassOf ex:${this.data} .
    }
  `;
    let query2: string = `

    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX ex: <http://www.semanticweb.org/kraft_dev/ontologies/2025/0/untitled-ontology-3#>

    SELECT ?parentClass WHERE {
      ex:${this.data} rdfs:subClassOf ?parentClass .
      FILTER (!isBlank(?parentClass))
    }
  `;

    if (this.data) {
      this.executeQuery(query1);
      this.executeQuery2(query2);
    }

  }

  executeQuery(query: string) {
    this.owlServices.executeQuery(query).subscribe({
      next: (data) => {

        this.subClass = this.extractValues(data);
        console.log(this.subClass);
        this.cdr.detectChanges();
      },
      error: () => {

      }
    });
  }
  executeQuery2(query: string) {
    this.owlServices.executeQuery(query).subscribe({
      next: (data) => {

        this.parenClass = this.extractValues2(data);
        console.log(this.parenClass);
        this.cdr.detectChanges(); // force a detecter le changement
      },
      error: () => {

      }
    });
  }

  extractValues(data: any): string[] {
    let listClass: string[] = [];
    data.results.bindings.forEach((owlClass: any) => {
      listClass.push(owlClass["subClass"].value.split('#')[1])
    });
    return listClass;
  }
  extractValues2(data: any): string[] {
    let listClass: string[] = [];
    data.results.bindings.forEach((owlClass: any) => {
      listClass.push(owlClass["parentClass"].value.split('#')[1])
    });
    return listClass;
  }
}
