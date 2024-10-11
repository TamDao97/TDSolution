import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectModule,
} from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';

export const libModule = [
  NgSelectModule,
  NgbToastModule,
  NgxLoadingModule,
  NgbDropdownModule,
  NgbCollapseModule,
  NgbModule,
];
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
