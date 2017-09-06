import { Component, EventEmitter, Output } from '@angular/core';
import { ShopPageService } from '../shop.page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../../app/core/common/form.component';

@Component({
  selector: 'app-create-shop-dialog',
  templateUrl: 'create-shop-dialog.component.html',
  styleUrls: ['create-shop-dialog.component.css'],
})
export class CreateShopDialogComponent extends FormComponent {
  public shopForm: FormGroup;
  public name: string = '';
  @Output() public onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected formErrors: any = {
    name: [],
  };
  protected validationMessages: Object = {
    name: {
      'required': 'Заполните название.',
      'minlength': 'Название должно быть не короче 3 символов.',
      'maxlength': 'Название должно быть короче 50 символов.',
      'unique': 'Название занято.'
    },
  };

  public constructor(
    private fb: FormBuilder,
    private service: ShopPageService
  ) {
    super();
    this.shopForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ]
    });

    this.shopForm.valueChanges
      .subscribe((data: any) => this.validateForm(this.shopForm));

    this.validateForm(this.shopForm);
  }

  public createShop(): void {
    if (this.shopForm.valid) {
      this.service.create('', {name: this.shopForm.controls.name.value})
        .subscribe((r: any) => {
          if (r.result) {
            this.onSubmit.emit(true);
          }
        });
    }
  }
}
