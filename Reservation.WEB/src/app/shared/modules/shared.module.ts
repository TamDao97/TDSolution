import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const libModule = [];
export const customDirective = [];

@NgModule({
  declarations: [],

  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  // providers: [NbStatusService], // Cung cấp service ở đây
})
export class SharedModule {}
