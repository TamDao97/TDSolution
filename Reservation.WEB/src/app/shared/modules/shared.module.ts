import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbButtonModule,
  NbSelectModule,
  NbCheckboxModule,
  NbRadioModule,
  NbAutocompleteModule,
} from '@nebular/theme';

export const libModule = [
  NbInputModule,
  NbSelectModule,
  NbCardModule,
  NbLayoutModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbAutocompleteModule,
];
export const customDirective = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  // providers: [NbStatusService], // Cung cấp service ở đây
})
export class SharedModule {}
