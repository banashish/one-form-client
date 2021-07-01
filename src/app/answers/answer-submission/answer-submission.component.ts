import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-answer-submission',
  templateUrl: './answer-submission.component.html',
  styleUrls: ['./answer-submission.component.css']
})
export class AnswerSubmissionComponent implements OnInit {
  formId: string
  constructor(private aRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.aRouter.params.subscribe(data => {
      this.formId = data.id
    })
  }

}
