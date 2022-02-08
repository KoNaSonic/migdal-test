import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";

const  contactsModule = () => import('./contact/contact.module').then(x =>x.ContactsModule)

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'contacts', loadChildren: contactsModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
