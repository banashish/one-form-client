import { from, Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem("token");

        if(token){
            const clone = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });
            return next.handle(clone);
        }
        else{
            return next.handle(req);
        }
    }
}
