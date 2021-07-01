import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormGroup

  @Input() question;
  @Input() form_slug;
  @Input() index;
  submitted: boolean;
  saveInProgress: boolean;

  constructor(private fb: FormBuilder, private questionService: QuestionService, private toastr: ToastrService) {
    this.questionForm = this.fb.group({
      text: ['', Validators.required],
      required: [false, Validators.required],
      kind: ['', Validators.required],
      order: ['']
    })
   }

  ngOnInit(): void {
    if(this.question && this.question.slug){
      this.setQuestionData()
    }
  }

  get f(){
    return this.questionForm.controls
  }

  onSubmit() {
    this.submitted = true;
    this.saveInProgress = true;
    if(this.questionForm.invalid){
      this.saveInProgress = false;
      return
    }
    const payload = {
      title: this.questionForm.controls.text.value,
      kind: this.questionForm.controls.kind.value,
      mandatory: this.questionForm.controls.required.value,
      order: this.questionForm.controls.order.value,
      form: this.form_slug
    }

    this.questionService.createQuestion(payload).subscribe(
      (res) => {
        this.toastr.success(`question created successfully!`);
        this.question = res.body;
        this.saveInProgress = false;
        this.submitted = false;
      },
      (err) => {
        this.saveInProgress = false
        this.submitted = false
        this.questionForm.reset();
        this.toastr.error(`${payload.title} ${err.error.message}`)
      }
      )
  }

  onUpdate(){
    this.submitted = true;
    this.saveInProgress = true;
    if(this.questionForm.invalid){
      this.saveInProgress = false;
      return
    }
    const payload = {
      title: this.questionForm.controls.text.value,
      kind: this.questionForm.controls.kind.value,
      mandatory: this.questionForm.controls.required.value,
      order: this.questionForm.controls.order.value,
      form: this.form_slug
    }

    this.questionService.updateQuestion(payload,this.question.slug).subscribe(
      (res) => {
        this.toastr.success(`question update successfully!`);
        this.question = res.body;
        this.saveInProgress = false;
        this.submitted = false;
      },
      (err) => {
        this.saveInProgress = false
        this.submitted = false
        this.setQuestionData()
        this.toastr.error(`${payload.title} ${err.error.message}`)
      }
      )
  }
  

  private setQuestionData(){
    this.questionForm.controls.text.setValue(this.question.text);
    this.questionForm.controls.kind.setValue(this.question.kind);
    this.questionForm.controls.required.setValue(this.question.required);
    this.questionForm.controls.order.setValue(this.question.order);
  }

  onDelete(){
    console.log("hello")
    if(this.question.slug){
      this.questionService.deleteQuestion(this.question.slug).subscribe(()=> {
        this.questionService.questionsSubject.next(this.index)
        this.toastr.success(`question update successfully!`);
      },
      (err)  => {
        this.toastr.error(`not deleted successfully`)
      })
    }
    else{
      this.questionService.questionsSubject.next(this.index)
    }
  }
      

}
