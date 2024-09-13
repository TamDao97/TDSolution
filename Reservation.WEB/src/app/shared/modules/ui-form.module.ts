import { NgModule } from '@angular/core';
import { TdInputComponent } from '../components/ui-form/td-input/td-input.component';
import { RequiredDirective } from '../directives/required.directive';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [RequiredDirective, TdInputComponent],
  imports: [SharedModule],
  exports: [TdInputComponent],
})
export class UiFormModule {}
