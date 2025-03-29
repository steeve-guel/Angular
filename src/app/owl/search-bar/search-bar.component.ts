import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {

  @Input({ required: true }) options!: string[] | undefined;

  readonly dialog = inject(MatDialog);

  myControl = new FormControl('', [Validators.required]);
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    console.log(this.options);
    const filterValue = value.toLowerCase();

    return this.options!.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSearchComponent,
      {
        data: {
          value: this.myControl.value,
          class: this.options
        }
      });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

