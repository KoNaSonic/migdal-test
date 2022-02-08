import { Component, OnInit } from '@angular/core';
import {contactPersons} from "../_models/contact";
import {ContactService} from "../_services/contact.service";
import {first} from "rxjs/operators";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactPersons!: contactPersons[];
  contactForm!: FormGroup;
  submitted = false;

  types: any = ["ראשון", "שְׁנִיָה"];

  constructor(
    private contactServise: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      deliveryFlag: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern
      (/^[\u0590-\u05FF\u200f ]+$/i)]],
      types:  ['', [Validators.required]],
      address:  ['', [Validators.required, Validators.pattern
      (/^[\u0590-\u05FF\u200f ]+$/i)]],
      phoneNumber: ['', [Validators.required, Validators.pattern
      (/^\d{3}-\d{7}$/)]],
      email: ['', [Validators.required, Validators.email]],

      contacts: this.formBuilder.array([this.createForm()],Validators.required),

      aliases: this.formBuilder.array([
        this.formBuilder.control('')
      ])

    });


      this.contactServise.getAll()
        .pipe(first())
        .subscribe(contactPersons => this.contactPersons = contactPersons);

  }

    // / convenience getter for easy access to form fields
      get f() { return this.contactForm.controls; }


      get aliases() {
        return this.contactForm.get('aliases') as FormArray;
      }

      addAlias() {
        this.aliases.push(this.formBuilder.control(''));
      }

      createForm():FormGroup{

        return this.formBuilder.group({
          deliveryFlag: ['', [Validators.required]],
          name: ['', [Validators.required, Validators.pattern
          (/^[\u0590-\u05FF\u200f ]+$/i)]],
          types:  ['', [Validators.required]],
          address:  ['', [Validators.required, Validators.pattern
          (/^[\u0590-\u05FF\u200f ]+$/i)]],
          phoneNumber: ['', [Validators.required, Validators.pattern
          (/^\d{3}-\d{7}$/)]],
          email: ['', [Validators.required, Validators.email]],

        })
      }

      get contacts():FormArray{
        return <FormArray> this.contactForm.get('contacts');
      }

      addContact() {
        this.contacts.push(this.createForm());
      }

      showContact() {
                 // @ts-ignore
        document.getElementById("showContact").style.display = "block";
      }

      hideContact() {
        // @ts-ignore
        document.getElementById("showContact").style.display = "none";
        this.contactForm.reset();
      }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    // display form values on success
    // alert(JSON.stringify(this.registrationForm.value))
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.contactForm.value, null, 4));

  }

  onReset() {
    this.submitted = false;
    this.contactForm.reset();
  }

  public createUser() {
    this.contactServise.create(this.contactForm.value)
      .pipe(first())
      .subscribe(() =>
      {
        // this.alertService.success('User added', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add();
  }

  // public deleteUser(id: string) {
  //
  //   const contact = this.contacts.find(this.contacts.values);
  //   if (!contact) return;
  //   contact.deliveryFlag = true;
  //      this.contactServise.delete(id)
  //     .pipe(first())
  //     .subscribe(() => this.contacts = this.contacts.filter(x => x.id !== id));
  //
  // }

}
