import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { apiUrl } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public questionsSubject = new Subject<any>();
  public questionObservable: Observable<any> = this.questionsSubject.asObservable()

  createQuestion(data) :Observable<any> {
    return this.http.post(apiUrl('questions'),data);
  }

  updateQuestion(data, slug): Observable<any> {
    return this.http.put(apiUrl('questions',slug),data)
  }

  deleteQuestion(slug): Observable<any>{
    console.log('------------------>',slug)
    return this.http.delete(apiUrl('questions',slug))
  }
}
