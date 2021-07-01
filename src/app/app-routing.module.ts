import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerNewComponent } from './answers/answer-new/answer-new.component';
import { AnswerSubmissionComponent } from './answers/answer-submission/answer-submission.component';
import { AnswersListComponent } from './answers/answers-list/answers-list.component';
import { FormEditComponent } from './forms/form-edit/form-edit.component';
import { FormsListComponent } from './forms/forms-list/forms-list.component';
import { FormsResolver } from './forms/forms.resolver';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './users/register/register.component';
import { SigninComponent } from './users/signin/signin.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forms',
    component: FormsListComponent
  },
  {
    path: 'forms/new',
    component: FormEditComponent
  },
  {
    path: 'forms/:id',
    component: FormEditComponent,
    resolve: {data : FormsResolver}
  },
  {
    path: 'answers/:id/new',
    component: AnswerNewComponent,
  },
  {
    path: 'answer/:id/valid-submission',
    component: AnswerSubmissionComponent
  },
  {
    path: 'answer/:id',
    component: AnswersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [FormsResolver]
})
export class AppRoutingModule { }
