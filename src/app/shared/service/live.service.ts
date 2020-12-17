import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsePageable } from '../models/reponsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = 'http://localhost:3012/lives';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

// public getLivesWithFlag(flag?: string): Observable<ResponsePageable>{
  // return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag)
  public getLivesWithFlag(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.apiUrl);
}

}