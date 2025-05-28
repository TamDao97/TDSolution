import { FormGroup } from '@angular/forms';

export class TdBaseComponent {
  constructor() {}

  /**
   *
   * @param frmGroup validate formGroup
   * @returns
   */
  validateForm(frmGroup: FormGroup): boolean {
    if (frmGroup.invalid) {
      frmGroup.markAllAsTouched();
      frmGroup.updateValueAndValidity();
      return false;
    } else return true;
  }
}
