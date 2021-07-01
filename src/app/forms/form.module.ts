import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsListComponent } from './forms-list/forms-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormFormComponent } from './form-form/form-form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';



@NgModule({
  declarations: [FormsListComponent, FormEditComponent, FormFormComponent, QuestionListComponent, QuestionFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
