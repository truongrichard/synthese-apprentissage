export class ValidationService {
    
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {

      switch (validatorName) {
          case 'required':
              return 'Required';
              break;
          case 'invalidEmailAddress':
              return 'Required';
              break;
          case 'invalidPassword':
              return 'Invalid password. Password must be at least 6 characters long, and contain a number.';
              break;
          case 'minlength':
              return `Minimum length ${validatorValue.requiredLength}`;
              break;     
          default:
              break;
      }
      return;
    }
  
    static emailValidator(control: any) {
      // RFC 2822 compliant regex
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    }
  
    static passwordValidator(control: any) {
      // {6,100}           - Assert password is between 6 and 100 characters
      // (?=.*[0-9])       - Assert a string has at least one number
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    }
  }
  