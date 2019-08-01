import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrintScreenService {
  constructor(private http: HttpClient) { }

  public init(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get(`/assets/text-ascii/init.txt`, { headers: headers, responseType: 'text' })
  }
}