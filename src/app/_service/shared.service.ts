import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
    private subject = new Subject<any>();

    baseUrl: string="https://mitral.herokuapp.com/";
    
    constructor(private http: HttpClient) {  }


    deleteAccount() {
        this.subject.next({ });
    }
    
    subscribeOnDeleteAccount(): Observable<any> {
        return this.subject.asObservable();
    }

    get(url: any): Observable<any> {
        return this.http.get<any>(this.baseUrl + url);
    }

    post(url: any, data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + url, data);
    }

    put(url: any, data: any): Observable<any> {
        return this.http.put<any>(this.baseUrl + url, data);
    }
    patch(url: any, data: any): Observable<any> {
        return this.http.patch<any>(this.baseUrl + url, data);
    }

    delete(url: any): Observable<any> {
        return this.http.delete<any>(this.baseUrl + url);
    }
}
