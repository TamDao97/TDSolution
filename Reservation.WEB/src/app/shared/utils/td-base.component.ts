import { FormGroup } from '@angular/forms';
import { NbToastrConfig, NbToastrService } from '@nebular/theme';

export class TdBaseComponent {
  constructor(private _toastrService: NbToastrService) {}

  validateForm(frmGroup: FormGroup): boolean {
    if (frmGroup.invalid) {
      frmGroup.markAllAsTouched();
      frmGroup.updateValueAndValidity();
      return false;
    } else return true;
  }

  //toast
  toastr(mess: string, title: string): void {
    this._toastrService.show(mess, title, { duration: 3000 });
  }
}
