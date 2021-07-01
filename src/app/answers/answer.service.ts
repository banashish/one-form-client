import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  createAnswer(data): Observable<any> {
    return this.http.post(apiUrl('answer'), data)
  }

  getAnswers(id): Observable<any> {
    return this.http.get(apiUrl('answer',id))
  }
}
