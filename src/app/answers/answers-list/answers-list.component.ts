import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormsService } from 'src/app/forms/forms.service';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {
  answers: any;
  form: any;
  isLoading = false

  constructor(private aRoute: ActivatedRoute, private answerService: AnswerService, private formService: FormsService) { }

  ngOnInit(): void {
    this.aRoute.params.pipe(
      mergeMap((res) => {
        const form = this.formService.getForm(res.id)
        const answer = this.answerService.getAnswers(res.id)
        return forkJoin([form,answer])
      }),
    ).subscribe(result => {
      this.isLoading = true
      this.form = result[0]['body']
      this.answers = result[1].body
    })
  }

}
