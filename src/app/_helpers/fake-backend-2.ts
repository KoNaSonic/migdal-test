import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';



// array in local storage for registered contacts
const contactsKey = 'test-migdal';
const contactsJSON = localStorage.getItem(contactsKey);
let contacts: any[] = contactsJSON ? JSON.parse(contactsJSON) : [{
  id: 123456789,
  deliveryFlag: true,
  type: {
    code: "1",
    value: "מבוטח"
  },
  name: "ניקיטה ג'יין",
  phoneNumber: "052-5816206",
  address: "רחובות אופנהיימר",
  email: "nikita_jain@amat.com",


}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/contacts') && method === 'GET':
          return getContacts();
        case url.match(/\/contacts\/\d+$/) && method === 'GET':
          return getContactById();
        case url.endsWith('/contacts') && method === 'POST':
          return createContact();
        case url.match(/\/contacts\/\d+$/) && method === 'PUT':
          return updateContact();
        case url.match(/\/contacts\/\d+$/) && method === 'DELETE':
          return deleteContact();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getContacts() {
      return ok(contacts.map(x => basicDetails(x)));
    }

    function getContactById() {
      const contactPersons = contacts.find(x => x.id === idFromUrl());
      return ok(basicDetails(contactPersons));
    }

    function createContact() {
      const contactPersons = body;

      if (contacts.find(x => x.email === contactPersons.email)) {
        return error(`User with the email ${contactPersons.email} already exists`);
      }

      // assign user id and a few other properties then save
      contactPersons.id = newContactId();
      contacts.push(contactPersons);
      localStorage.setItem(contactsKey, JSON.stringify(contacts));

      return ok();
    }

    function updateContact() {
      let params = body;
      let contact = contacts.find(x => x.id === idFromUrl());

      if (params.email !== contact.email && contacts.find(x => x.email === params.email)) {
        return error(`User with the email ${params.email} already exists`);
      }


      // update and save contact
      Object.assign(contact, params);
      localStorage.setItem(contactsKey, JSON.stringify(contacts));

      return ok();
    }

    function deleteContact() {
      contacts = contacts.filter(x => x.id !== idFromUrl());
      localStorage.setItem(contactsKey, JSON.stringify(contacts));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: any) {
      return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDetails(contact: any) {
      const { id, deliveryFlag, code, value, name, address,  phoneNumber, email } = contact;
      return { id, deliveryFlag, code, value, name, address, phoneNumber, email, };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function newContactId() {
      return contacts.length ? Math.max(...contacts.map(x => x.id)) + 1 : 1;
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
