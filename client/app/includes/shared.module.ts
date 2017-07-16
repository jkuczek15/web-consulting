import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidator } from './directives/equal-validator.directive';
import { Router, NavigationEnd } from '@angular/router';

@NgModule({
  imports:      [ CommonModule],
  declarations: [ EqualValidator],
  exports:      [ EqualValidator, CommonModule ]
})
export class SharedModule {

    constructor(private router: Router) { }

    // Shared validation messages among forms
    public validationMessages: any = {
        'username': {
          'required':   'Display name is required.',
          'minlength':  'Display name must be at least 4 characters.',
          'maxlength':  'Display name cannot be longer than 24 characters.',
          'pattern':    'Display name is invalid.',
        },
        'email': {
          'required':   'Email is required.',
          'pattern':    'Email is invalid.'
        },
        'password': {
          'required':   'Password is required.'
        },
        'confirm_password': {
          'required':   'Confirmation password is required.',
          'validateEqual': 'Confirmation password must match original password.'
        },
        'auth': {
          'incorrectLogin': 'Incorrect email address or password.'
        }
    };

    // Shared regex patterns among forms
    public patterns: any = {
      'username': '^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*([a-zA-Z0-9])*$',
      'email': /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    };

    // Shared 'onValueChanged' function for executing code each time form input changes
    public onValueChanged(component, formKey, data?: any) {
      if (!component[formKey]) { return; }
      const form = component[formKey];
 
      for (const field in component.formErrors) {
        // Clear previous error message (if any)
        component.formErrors[field] = '';
        const control = form.get(field);
  
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          component.formErrors[field] = '<ul>';
          
          for (const key in control.errors) {
            component.formErrors[field] += '<li>' + messages[key] + '</li>';
          }// end for loop over all the errors

          component.formErrors[field] += '</ul>';
        }// end if the field has been modified and invalid

      }// end for loop over all form errors

    }// end onValueChanged function

    // Shared 'onRouteChange' function executing code each time route changes
    public onRouteChange(funct) {
      this.router.events.filter(event => (event instanceof NavigationEnd)).subscribe((routeData: any) => {
        // Upon completition of route change, call our custom function
        funct(routeData);
      });
    }// end shared module function for setting an 'onRouteChange' event

 }// end class SharedModule