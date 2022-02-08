import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    registrationForm!: FormGroup;
    submitted = false;

    submittedBy: any = [ 'מבוטח', 'סוכן', 'בן/בת זוג'];

    superClaimType: any = ['התביעה אושרה', 'התביעה נדחתה', 'טרם התקבלה החלטה'];

    claimCause: any = ["תאונה", "מחלה", "תאונת עבודה", "אחר"];

    injuryType: any = ["אגן", "גפיים", "ראש", "גב", "לב", "נפש"];

    submitionMethod: any = ['דואר', 'דיגיטל', 'פקס'];

    constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      superClaimType: ['', [Validators.required]],
      eventDate: ['', [Validators.required, Validators.pattern
      // (/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/)]],
      (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      claimCause: ['', [Validators.required]],
      injuryType: ['', [Validators.required]],
      submittedBy: ['', [Validators.required]],
      submitionMethod: ['', [Validators.required]],
      addDynamicElement: this.fb.array([])
    });
  }

// convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    // display form values on success
    // alert(JSON.stringify(this.registrationForm.value))
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value, null, 4));

  }

  onReset() {
    this.submitted = false;
    this.registrationForm.reset();
  }



}
