import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../../../app/core/common/form.component';
import { StockPageService } from '../stock.page.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: 'create-product-dialog.component.html',
  styleUrls: ['create-product-dialog.component.css'],
})
export class CreateProductDialogComponent extends FormComponent {
  public productForm: FormGroup;
  public name: string = '';
  @Output() public onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected formErrors: any = {
    name: [],
    firm: [],
    buyPrice: [],
    sellPrice: [],
    size: [],
    count: [],
  };
  protected validationMessages: Object = {
    name: {
      'required': 'Заполните название.',
      'minlength': 'Название должно быть не короче 3 символов.',
      'maxlength': 'Название должно быть короче 255 символов.',
      'unique': 'Название занято.'
    },
    firm: {
      'required': 'Заполните название.',
      'minlength': 'Название фирмы должно быть не короче 3 символов.',
      'maxlength': 'Название фирмы должно быть короче 255 символов.'
    },
  };

  public constructor(
    private fb: FormBuilder,
    private service: StockPageService
  ) {
    super();

    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255)
        ]
      ],
      firm: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255)
        ]
      ],
      buyPrice: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],
      sellPrice: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],
      sizes: this.fb.array([
        this.initSizeGroup()
      ])
    });

    this.productForm.valueChanges
      .subscribe((data: any) => this.validateForm(this.productForm));

    this.validateForm(this.productForm);
  }

  public initSizeGroup(): FormGroup {
    return this.fb.group({
      size: [''],
      count: [''],
    });
  }

  public addSize(): void {
    const control: FormArray = <FormArray>this.productForm.controls['sizes'];
    control.push(this.initSizeGroup());
  }

  public removeSize(i: number): void {
    const control: FormArray = <FormArray>this.productForm.controls['sizes'];
    control.removeAt(i);
  }

  public createProduct(): void {
    if (this.productForm.valid) {
      this.service.create('', {name: this.productForm.controls.name.value})
        .subscribe((r: any) => {
          if (r.result) {
            this.onSubmit.emit(true);
          }
        });
    }
  }
}
