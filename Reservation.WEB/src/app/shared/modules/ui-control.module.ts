import { NgModule } from '@angular/core';
import { TdInputComponent } from '../components/ui-control/td-input/td-input.component';
import { RequiredDirective } from '../directives/required.directive';
import { SharedModule } from './shared.module';
import { TdSelectComponent } from '../components/ui-control/td-select/td-select.component';
import { TdTextAreaComponent } from '../components/ui-control/td-text-area/td-text-area.component';

@NgModule({
  declarations: [
    RequiredDirective,
    TdInputComponent,
    TdSelectComponent,
    TdTextAreaComponent,
  ],
  imports: [SharedModule],
  exports: [TdInputComponent, TdSelectComponent, TdTextAreaComponent],
})
export class UiControlModule {}
