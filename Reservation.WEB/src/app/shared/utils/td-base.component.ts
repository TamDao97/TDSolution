import { FormGroup } from '@angular/forms';

export class TdBaseComponent {
  constructor() {}

  validateForm(frmGroup: FormGroup): boolean {
    if (frmGroup.invalid) {
      frmGroup.markAllAsTouched();
      frmGroup.updateValueAndValidity();
      return false;
    } else return true;
  }
}
