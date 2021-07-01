import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { FormsService } from 'src/app/forms/forms.service';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answer-new',
  templateUrl: './answer-new.component.html',
  styleUrls: ['./answer-new.component.css']
})
export class AnswerNewComponent implements OnInit {
  form;
  isLoading: boolean = false;
  question_form: FormGroup;
  submitted: boolean = false;
  saveInProgress: boolean = false;
  constructor(private router: ActivatedRoute, private formService: FormsService, private fb: FormBuilder, private answerService: AnswerService,private route: Router) { }

  ngOnInit(): void {
    this.router.params.pipe(mergeMap(res => {return this.formService.getForm(res.id)})).subscribe((form) => {
      this.form = form['body'];
      console.log(this.form);
      document.body.style.setProperty(`--themeColor`, this.form.color);
      document.body.style.setProperty(`--fontbackColor`, `${this.form.color}60`);
      this.question_form = this.fb.group({})
      this.form.question.forEach(qn => {
        const control = new FormControl('')
        if(qn.required){
          control.setValidators(Validators.required)
        }
        this.question_form.addControl(qn.slug,control)
      });
      this.isLoading = true;
    })
  }

  onSubmit(){
    this.submitted = true;
    this.saveInProgress = true
    if(this.question_form.invalid){
      this.saveInProgress = false;
      return 
    }
    const payload = this.createPayload()
    this.answerService.createAnswer(payload).subscribe(
    () => {
      this.saveInProgress = false;
      this.route.navigate(['answer', this.form.slug, 'valid-submission'])
    },
    () => {
      this.saveInProgress = false;
    })
  }

  f(slug){
    return this.question_form.controls[`${slug}`]
  }

  private createPayload(){
    const payload = {
      form: this.form.slug,
      questions: []
    }
    Object.keys(this.question_form.controls).forEach(element => {
      payload.questions.push({
        id: element,
        value: this.question_form.controls[element].value
      })
    });

    return payload
  }

}
