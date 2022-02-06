import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

// export type EditorType = 'name' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'migdal-test';

  // submitted = false;

  // oppoSuits: any = ['Men', 'Women', 'Boys', 'Inspiration']
  //
  // constructor(public fb: FormBuilder) { }
  // oppoSuitsForm = this.fb.group({
  //   name: ['', [Validators.required]]
  // })
  //
  // /* Select Dropdown error handling */
  // public handleError = (controlName: string, errorName: string) => {
  //   return this.oppoSuitsForm.controls[controlName].hasError(errorName);
  // }
  //
  // onSubmit() {
  //   alert(JSON.stringify(this.oppoSuitsForm.value))
  // }

  // editor: EditorType = 'name';
  //
  // get showNameEditor() {
  //   return this.editor === 'name';
  // }
  //
  // get showProfileEditor() {
  //   return this.editor === 'profile';
  // }
  //
  // toggleEditor(type: EditorType) {
  //   this.editor = type;
  // }

}
