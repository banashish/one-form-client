import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerNewComponent } from './answer-new/answer-new.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerSubmissionComponent } from './answer-submission/answer-submission.component';
import { AnswersListComponent } from './answers-list/answers-list.component';



@NgModule({
  declarations: [AnswerNewComponent, AnswerSubmissionComponent, AnswersListComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AnswersModule { }
