import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  @Input() form_properties;
  @Input() question_list;

  questions: any = []
  questionSubscription: Subscription
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionSubscription = this.questionService.questionObservable.subscribe((res) => {
      this.question_list.splice(res,1);
    })
  }

  addQuestion(){
    this.question_list.push({})
  }

  ngOnDestroy(){
    this.questionSubscription.unsubscribe()
  }

}
