import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EntranceWindowType } from './auth-window-type.enum';
import { Router } from '@angular/router';
import { UserService } from '../../models/user/index';
import { User } from '../../models/user/user.model';
import { AuthService } from '../../services/auth/auth.service';
// @todo remember page which user try to go and redirect to it after auth
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [
    AuthService,
    UserService
  ]
})
export class AuthComponent implements OnInit {
  @ViewChild('passwordInput') protected passwordInput: any;

  public userForm: FormGroup;
  public windowIsRegistration: boolean = false;
  public formErrors: any = {
    name: [],
    email: [],
    password: [],
  };
  public passwordType: string = 'password';
  public capsLockEnabled: boolean = false;

  private validationTimeout: any;
  private windowType: EntranceWindowType;
  private validationMessages: Object = {
    name: {
      'required': 'Заполните ник, пожалуйста.',
      'minlength': 'Ник должен быть не короче 3 символов.',
      'maxlength': 'Ник должен быть короче 255 символов.',
      'unique': 'Ник занят.'
    },
    email: {
      'required': 'Заполните email, пожалуйста.',
      'maxlength': 'Email должен быть короче 255 символов.',
      'pattern': 'Email невалидный.',
      'unique': 'Email занят.',
      'loginFail': 'Email или пароль не соответствуют.'
    },
    password: {
      'required': 'Заполните пароль, пожалуйста.',
      'minlength': 'Пароль должен быть не короче 5 символов.'
    },
  };

  /**
   * @param {FormBuilder} fb
   * @param {Router} router
   * @param {UserService} userService
   * @param {AuthService} authService
   */
  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.checkIsAuthed();

    this.windowType = EntranceWindowType.auth;
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });

    this.userForm.valueChanges
      .subscribe((data: any) => this.validateForm());

    this.validateForm();
  }

  public ngOnInit(): void {
    this.passwordInput.nativeElement.addEventListener('keypress', (e: any) => {
      let charCode: number;

      if (e.which) {
        charCode = e.which;
      } else if (e.keyCode) {
        charCode = e.keyCode;
      }

      let shiftOn: boolean = false;
      if (e.shiftKey) {
        shiftOn = e.shiftKey;
      } else if (e.modifiers) {
        shiftOn = !!(e.modifiers & 4);
      }

      if (charCode >= 65 && charCode <= 90 && !shiftOn) {
        this.capsLockEnabled = true;
      } else if (charCode >= 1040 && charCode <= 1071 && !shiftOn) {
        this.capsLockEnabled = true;
      } else {
        this.capsLockEnabled = charCode === 1025 && !shiftOn;
      }
    });
  }

  /**
   * Registers User or makes auth
   */
  public doSubmit(): void {
    const formValid: boolean = this.checkFormIsValid();

    if (!formValid) {
      return;
    }

    const user: User = new User(this.userForm.value);

    if (this.windowType === EntranceWindowType.auth) {
      this.authUser(user);
    } else {
      this.registerUser(user);
    }
  }

  /**
   * Returns a text  for the link
   *
   * @return {string}
   */
  public getAnotherWindowType(): string {
    return this.windowType === EntranceWindowType.auth ? 'Регистрация' : 'Авторизация';
  }

  /**
   * Returns a text for the button
   *
   * @return {string}
   */
  public getAnotherButtonMessage(): string {
    return this.windowType === EntranceWindowType.auth ? 'Войти' : 'Зарегистрироваться';
  }

  /**
   * Toggles a type of the window
   *
   * @param {MouseEvent} event
   */
  public changeWindowType(event: MouseEvent): void {
    event.preventDefault();

    this.windowIsRegistration = !this.windowIsRegistration;
    this.windowType = this.windowType === EntranceWindowType.auth ?
      EntranceWindowType.registration : EntranceWindowType.auth;

    if (this.windowType === EntranceWindowType.registration) {
      const control: AbstractControl = this.userForm.get('name');
      control.enable();
    }
  }

  public togglePasswordType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  /**
   * Checks auth and redirect to the home
   */
  private checkIsAuthed(): void {
    if (this.authService.userIsAuthed()) {
      this.router.navigate(['home']);
    }
  }

  /**
   * Checks if form needs to be validated
   */
  private validateForm(): void {
    if (!this.userForm) {
      return;
    }

    this.checkErrors();
  }

  /**
   * Checks controls errors and creates an array of error messages
   */
  private checkErrors(): void {
    const form: FormGroup = this.userForm;

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

  /**
   * Authorizes user
   *
   * @param {User} user
   */
  private authUser(user: User): void {
    const errorsParser: any = this.parseBackendErrors.bind(this);
    this.userService.authUser(user)
      .subscribe(
        (result: any) => {
          this.authService.rememberUser(result.result);
          this.checkIsAuthed();
        },
        errorsParser
      );
  }

  /**
   * Registers user
   *
   * @param {User} user
   */
  private registerUser(user: User): void {
    const errorsParser: any = this.parseBackendErrors.bind(this);
    this.userService.createUser(user)
      .subscribe(
        (newUser: User) => {
          this.authService.rememberUser(newUser);
        },
        errorsParser
      );
  }

  /**
   * @param {any} errors
   */
  private parseBackendErrors(errors: any): void {
    const parsedErrors: Object = errors.json();

    for (const field in parsedErrors) {
      if (parsedErrors.hasOwnProperty(field)) {
        const messages: Object = this.validationMessages[field];
        this.formErrors[field] = [];

        for (const errorName of parsedErrors[field]) {
          this.formErrors[field].push(messages[errorName]);
        }
      }
    }

  }

  /**
   * @return {boolean}
   */
  private checkFormIsValid(): boolean {
    const form: FormGroup = this.userForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        const control: AbstractControl = form.get(field);

        if (control && !control.dirty) {
          control.markAsDirty();
        }
      }
    }

    if (this.windowType === EntranceWindowType.auth) {
      const control: AbstractControl = form.get('name');
      control.disable();
    }

    this.checkErrors();

    return this.userForm.valid;
  }

}
