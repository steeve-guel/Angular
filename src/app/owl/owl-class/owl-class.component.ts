import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OwlServicesService } from '../../_services/owl-services.service';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from '../property/property.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDetailsClassComponent } from '../dialog-details-class/dialog-details-class.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-owl-class',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, PropertyComponent, SearchBarComponent],
  templateUrl: './owl-class.component.html',
  styleUrl: './owl-class.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwlClassComponent {
  query: string = `

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    SELECT ?class WHERE {
      ?class a owl:Class .
      FILTER (!isBlank(?class))
    }
  `;
  results : string [] | undefined;

  test!: string;

  data: any;

  //dialog
  readonly dialog = inject(MatDialog);

  constructor(private owlServices: OwlServicesService) { }

  ngOnInit() {
    this.executeQuery();
  }

  extractValues(data: any): string[] {
    let listClass:string[] = [];
    data.results.bindings.forEach((owlClass:any) => {
      listClass.push(owlClass["class"].value.split('#')[1])
    });
    return listClass;
  }
  executeQuery() {
    this.owlServices.executeQuery(this.query).subscribe(
      {
        next: (data) => {

          this.results = this.extractValues(data);

          //console.log(data); // Affiche les résultats dans la console
          //console.log(data.results.bindings[0].s.value.split('#')[1]); // Affiche les résultats dans la console
          //console.log(this.results.head.vars);
          //console.log(this.extractValues(data))
        },
        error: (error) => {
          console.error('Erreur lors de la requête SPARQL :', error);
        }
      }
    );
  }

  //dialog

  openDialog(owlcalss:any) {
    const dialogRef = this.dialog.open(DialogDetailsClassComponent,{
      data : owlcalss
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
