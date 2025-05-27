import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const libModule = [];
export const libDirective = [
  // NgLabelTemplateDirective,
  // NgOptionTemplateDirective,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...libModule,
    ...libDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...libModule,
    ...libDirective,
  ],
  // providers: [NbStatusService], // Cung cấp service ở đây
})
export class SharedModule {}
