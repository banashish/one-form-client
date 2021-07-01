import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted =  false;
  errorMessage = ''
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      userEmail: ['',[Validators.required,Validators.email]],
      userPassword: ['',[Validators.required,Validators.minLength(6)]],
      userConfirmPassword: ['',[Validators.required,confirmPasswordValidator]]
    })
   }

  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true
    if(this.registerForm.invalid){
      return
    }
    const user = {
      email: this.registerForm.controls.userEmail.value.toLowerCase(),
      password: this.registerForm.controls.userPassword.value,
      password_confirmation: this.registerForm.controls.userConfirmPassword.value
    }

    this.auth.signUp(user).subscribe(
    (res) => {
      localStorage.setItem("token",res.token);
      this.router.navigate(['/form'])
    },
    (err) => {
      if(err.status === 424){
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
      }
      else{
        // this.registerForm.reset();
        this.submitted = false;
        console.log(err)
      }
    }
    );
  }

}

function confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if(control && control.parent){
    return control.parent.get('userPassword').value === control.value ? null : { confirmPassword : true }
  }
  return null
}
