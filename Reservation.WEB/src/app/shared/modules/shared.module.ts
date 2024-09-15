import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export const metarialModule = [MatInputModule];
export const customDirective = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...metarialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...metarialModule],
})
export class SharedModule {}
