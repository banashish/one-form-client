import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  formList = [];
  listLoading: boolean;

  constructor(private serve: FormsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllForms();
  }

  getAllForms() {
    this.serve.getForms().subscribe(res => {
      this.formList = res.body
      this.formList.map(form => {
        const currDate = new Date()
        const createDate = new Date(form.created_at) 
        if((currDate.getFullYear() - createDate.getFullYear()) > 0){
          form.created_at = `${currDate.getFullYear() - createDate.getFullYear()} years ago`
        }
        else {
          if((currDate.getMonth() - createDate.getMonth()) > 0) {
            form.created_at = `${currDate.getMonth() - createDate.getMonth()} months ago`
          }
          else {
            form.created_at = `${currDate.getDate() - createDate.getDate()} days ago`
          }
        }
      })
      this.listLoading = true;
    })
  }

  onDelete(form){
    this.serve.deleteForm(form.slug).subscribe((res) => {
      this.formList.splice(this.formList.indexOf(form),1)
      this.toastr.success(`${form.name} deleted successfully!`)
    },
    (err) => {

    })
  }
}
