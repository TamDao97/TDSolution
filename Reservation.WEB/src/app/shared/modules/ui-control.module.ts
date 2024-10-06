import { NgModule } from '@angular/core';
import { RequiredDirective } from '../directives/required.directive';
import { SharedModule } from './shared.module';
import { TdSelectComponent } from '../components/ui-control/td-select/td-select.component';
import { TdTextAreaComponent } from '../components/ui-control/td-text-area/td-text-area.component';
import { TdCheckboxComponent } from '../components/ui-control/td-checkbox/td-checkbox.component';
import { TdRadioComponent } from '../components/ui-control/td-radio/td-radio.component';
import { TdToastComponent } from '../components/ui-control/td-toast/td-toast.component';
import { TdInputComponent } from '../components/ui-control/td-input/td-input.component';

@NgModule({
  declarations: [
    RequiredDirective,
    TdInputComponent,
    TdSelectComponent,
    TdTextAreaComponent,
    TdCheckboxComponent,
    TdRadioComponent,
    TdToastComponent,
  ],
  imports: [SharedModule], // Đăng ký component cho ag-grid],
  exports: [
    TdInputComponent,
    TdSelectComponent,
    TdTextAreaComponent,
    TdCheckboxComponent,
    TdRadioComponent,
    TdToastComponent,
  ],
})
export class UiControlModule {}
