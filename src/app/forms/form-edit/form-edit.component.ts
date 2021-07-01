import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {
  form;
  constructor(private router : ActivatedRoute,private questionService: QuestionService) { }

  ngOnInit(): void {
    this.router.data.subscribe(res => {
      if(res.data){
        this.form = res.data.body
        this.questionService.questionsSubject.next(this.form.question)
      }
    })
  }

}
