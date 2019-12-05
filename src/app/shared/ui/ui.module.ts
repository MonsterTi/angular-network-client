// les modules natifs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Material module
import { 
  MatButtonModule,
  MatTabsModule, 
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonToggleModule,
  MatAutocompleteModule
} from '@angular/material';
import 'hammerjs';


const materialArray = [
  MatButtonModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatButtonToggleModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialArray,
  ],
  exports: materialArray
})
export class UiModule { }
