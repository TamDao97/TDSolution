import { NgModule } from '@angular/core';
import { TdInputComponent } from '../components/ui-control/td-input/td-input.component';
import { RequiredDirective } from '../directives/required.directive';
import { SharedModule } from './shared.module';
import { TdSelectComponent } from '../components/ui-control/td-select/td-select.component';
import { TdTextAreaComponent } from '../components/ui-control/td-text-area/td-text-area.component';
import { TdSelectMutilComponent } from '../components/ui-control/td-select-mutil/td-select-mutil.component';
import { TdSelectGroupComponent } from '../components/ui-control/td-select-group/td-select-group.component';
import { TdCheckboxComponent } from '../components/ui-control/td-checkbox/td-checkbox.component';
import { TdRadioComponent } from '../components/ui-control/td-radio/td-radio.component';
import { TdAutoCompleteComponent } from '../components/ui-control/td-auto-complete/td-auto-complete.component';

@NgModule({
  declarations: [
    RequiredDirective,
    TdInputComponent,
    TdSelectComponent,
    TdTextAreaComponent,
    TdSelectMutilComponent,
    TdSelectGroupComponent,
    TdCheckboxComponent,
    TdRadioComponent,
    TdAutoCompleteComponent,
  ],
  imports: [SharedModule],
  exports: [
    TdInputComponent,
    TdSelectComponent,
    TdTextAreaComponent,
    TdSelectMutilComponent,
    TdSelectGroupComponent,
    TdCheckboxComponent,
    TdRadioComponent,
    TdAutoCompleteComponent,
  ],
})
export class UiControlModule {}
