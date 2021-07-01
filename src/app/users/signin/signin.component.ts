import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup
  submitted: boolean = false
  errorMessage = ''
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      userEmail: ['',[Validators.required,Validators.email]],
      userPassword: ['',[Validators.required,Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }

  get f() { return this.signInForm.controls; }

  onSubmit(){
    this.submitted = true
    if(this.signInForm.invalid){
      return
    }
    const user = {
      email: this.signInForm.controls.userEmail.value.toLowerCase(),
      password: this.signInForm.controls.userPassword.value
    }

    this.auth.login(user).subscribe(
    (res) => {
      localStorage.setItem("token",res.token);
      this.router.navigate(['/forms'])
    },
    (err) => {
      if(err.status === 424){
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
      }
      else{
        this.signInForm.reset();
        this.submitted = false;
        console.log(err)
      }
    }
    );
  }

}
