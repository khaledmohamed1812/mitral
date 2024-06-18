// import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');

        if (token != null) {
            request = request.clone({
                setHeaders: {'token': token,}
            });
        }
        return next.handle(request);
    }
}