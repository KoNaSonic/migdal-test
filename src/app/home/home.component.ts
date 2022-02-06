import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";

import {MustMatch} from "../_helpers";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  submitted = false;

  // City names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  contactPersonType: any = [
    { code: 1, value: 'מבוטח' },
    { code: 2, value: 'סוכן' },
    { code: 3, value: 'בן/בת זוג' }];

  superClaimType: any = [
    { code: 1, value: "התביעה אושרה" },
    { code: 2, value: "התביעה נדחתה" },
    { code: 4, value: "טרם התקבלה החלטה" }]
;
  claimCause: any = [
    { code: 1, value: "תאונה" },
    { code: 2, value: "מחלה" },
    { code: 5, value: "תאונת עבודה" },
    { code: 6, value: "אחר" }];

  injuryType: any = [
    { code: 1, value: "אגן" },
    { code: 2, value: "גפיים" },
    { code: 5, value: "ראש" },
    { code: 6, value: "גב" },
    { code: 7, value: "לב" },
    { code: 9, value: "נפש" }];

  submitionMethod: any = [
    { code: 1, value: 'דואר' },
    { code: 2, value: 'דיגיטל' },
    { code: 3, value: 'פקס' }];

  identityTypes: any = [
    { code: 1, value: 'ת.ז.' },
    { code: 2, value: 'דרכון' },
    { code: 3, value: 'מבוטח' },
    { code: 4, value: 'מפעל' }];

  constructor(public fb: FormBuilder) { }

  registrationForm = this.fb.group({
    file: [null],
    fullName: this.fb.group({
      firstName: [''],
      lastName: ['']
    }),
    email: [''],
    phoneNumber: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      cityName: ['']
    }),
    gender: [''],
    PasswordValidation: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }),
    addDynamicElement: this.fb.array([])
  });

// convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  // Choose city using select dropdown
  // changeCity(e) {
  //   this.registrationForm.get('address.cityName').setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }

}
