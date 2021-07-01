import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { FormsService } from './forms.service';

@Injectable()
export class FormsResolver implements Resolve<any> {
  constructor( private service: FormsService ) {}

  resolve(router: ActivatedRouteSnapshot) {
    const id =  router.params.id;
    return this.service.getForm(id).pipe(
        map(res => {
            return res
        }),
        catchError(() => {
            return of({})
        })
    )
  }
}
