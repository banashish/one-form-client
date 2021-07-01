import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  getForms(): Observable<any> {
    return this.http.get(apiUrl('forms'));
  }

  createForm(data): Observable<any> {
    return this.http.post(apiUrl('forms'),data);
  }

  deleteForm(data) {
    return this.http.delete(apiUrl('forms',data));
  }

  getForm(id) {
    return this.http.get(apiUrl('forms',id));
  }

  updateForm(id,data){
    return this.http.put(apiUrl('forms',id),data);
  }
}
