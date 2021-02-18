import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      userEmail: ['',[Validators.required,Validators.email]],
      userPassword: ['',[Validators.required,Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signInForm.controls)
  }

}
