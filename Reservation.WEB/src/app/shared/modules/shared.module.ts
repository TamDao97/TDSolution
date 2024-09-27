import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

export const libModule = [NgSelectModule];
export const customDirective = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...libModule],
  // providers: [NbStatusService], // Cung cấp service ở đây
})
export class SharedModule {}
