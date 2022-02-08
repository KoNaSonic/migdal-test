import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';

import {ContactsRoutingModule} from "./contact-routing.module";
import {ContactComponent} from "./contact.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ContactsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ContactComponent,

    ]
})
export class ContactsModule { }
