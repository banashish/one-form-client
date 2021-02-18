import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      userName: ['',[Validators.required,Validators.email]],
      userPassword: ['',[Validators.required,Validators.minLength(6)]],
      userConfirmPassword: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("Hiii")
    console.log(this.registerForm.controls)
  }

}
