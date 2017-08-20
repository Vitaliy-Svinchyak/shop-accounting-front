import { AbstractControl, FormGroup } from '@angular/forms';

export class FormComponent {

  protected formErrors: any = {};
  protected validationMessages: any = {};

  /**
   * Checks if form needs to be validated
   */
  protected validateForm(form: FormGroup): void {
    if (!form) {
      return;
    }

    this.checkErrors(form);
  }

  protected checkErrors(form: FormGroup): void {

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = [];
        const control: AbstractControl = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages: Object = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field].push(messages[key]);
            }
          }
        }
      }
    }
  }

}
