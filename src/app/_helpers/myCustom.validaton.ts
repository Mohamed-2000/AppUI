import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../_models/user';

export class myCustom {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

//   static CheckEmail(users: User[],control:AbstractControl) :Promise<ValidationErrors>|null{
//     return new Promise((resolve,reject)=>{
// users.forEach(element => {
//   if (element.email==control.value)
//   {
//     resolve({IExist: true})
//   }

// });
// resolve({IExist: false})

//     })
//   }
}
