import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredDirective } from '../../directives/required.directive';

export const primeNgModule = [];
export const customDirective = [];

@NgModule({
  declarations: [RequiredDirective],
  imports: [CommonModule, ReactiveFormsModule, RequiredDirective],
  exports: [CommonModule, ReactiveFormsModule, RequiredDirective],
})
export class SharedModule {}
