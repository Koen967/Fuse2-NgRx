import { Directive, Attribute } from '@angular/core';
import {
  ValidatorFn,
  FormControl,
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export function futureDateValidator(
  control: AbstractControl
): ValidationErrors {
  if (control.dirty) {
    return control.value >= new Date() ? null : { dateNotInFuture: true };
  } else {
    return null;
  }
}

export function biggerThan(validated: string, comparison: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const bigger =
      control.get(validated).value >= control.get(comparison).value;
    if (!bigger) {
      control.get(validated).setErrors({ valueIsSmaller: true });
    }
    return bigger ? null : { valueIsSmaller: true };
  };
}

export function afterDateValidator(control: AbstractControl) {
  const comparableDate = control.get('validFrom').value;
  const date = control.get('dateExpired').value;
  return date >= comparableDate
    ? null
    : control.get('dateExpired').setErrors({ dateNotAfterValid: true });
}

@Directive({
  selector: '[DateValidation][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: futureDateValidator,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: afterDateValidator,
      multi: true
    }
  ]
})
export class ContractFormDirective {
  constructor() {}
}
