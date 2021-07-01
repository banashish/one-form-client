import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-form-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.css']
})
export class FormFormComponent implements OnInit {
  form : FormGroup
  submitted = false
  saveInProgress = false

  @Input() form_properties;
  constructor(private fb: FormBuilder, private formService : FormsService, private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['',Validators.required],
      description: [''],
      color: ['#f7f3f3'],
      status: [false]
    })
   }

  ngOnInit(): void {
    if(this.form_properties){
      this.setFormValues();
    }
  }

  get f(){
    return this.form.controls
  }

  onSubmit(){
    this.submitted = true;
    this.saveInProgress = true;
    if(this.form.invalid){
      this.saveInProgress = false;
      return
    }
    const payload = {
      title: this.f.name.value,
      description: this.f.description.value,
      primary_color: this.f.color.value,
      enable: this.f.status.value
    }
    this.formService.createForm(payload).subscribe(
    (res) => {
      this.toastr.success(`${res.body.name} created successfully!`);
      this.form_properties = res.body;
      this.saveInProgress = false;
      this.submitted = false;
    },
    (err) => {
      this.saveInProgress = false
      this.submitted = false
      this.form.reset();
      if(err.error.errors.title){
        this.toastr.error(`${payload.title} has already been taken as title, chose a new one!`)
      }
      else{
        this.toastr.error(`${payload.title} ${err.error.message}`)
      }
    }
    )
  }

  onUpdate(){
    this.submitted = true;
    this.saveInProgress = true;
    if(this.form.invalid){
      this.saveInProgress = false;
      return
    }
    const payload = {
      title: this.f.name.value,
      description: this.f.description.value,
      primary_color: this.f.color.value,
      enable: this.f.status.value
    }


    this.formService.updateForm(this.form_properties.slug,payload).subscribe(
      (res) => {
        this.toastr.success(`${res['body'].name} updated successfully!`);
        this.form_properties = res['body'];
        this.saveInProgress = false;
        this.submitted = false;
        this.form.markAsPristine();
      },
      (err) => {
        console.log(err)
        this.saveInProgress = false;
        this.submitted = false;
        this.setFormValues();
        if(err.error.errors.title){
          this.toastr.error(`${payload.title} has already been taken as title, chose a new one!`)
        }
        else{
          this.toastr.error(`${payload.title} ${err.error.message}`)
        }
      }
    )
  }

  private setFormValues(){
    this.form.setValue({
      name: this.form_properties.name,
      description:this.form_properties.description,
      color: this.form_properties.color,
      status: this.form_properties.status
    })
  }

}
