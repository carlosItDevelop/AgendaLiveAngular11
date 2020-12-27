import { map, catchError } from 'rxjs/operators';
import { Live } from './../models/live.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ResponsePageable } from '../models/reponsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = 'http://localhost:3012/lives';
  //apiUrl = 'http://localhost:3012/lives?_page=1&_limit=6'


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  errorHandler: any;

  constructor(private http: HttpClient, errorHandler: ErrorHandler) { }

  /* Com paginação no server */
  public obterLivesPaginadas(_statusLive: string, _page?: string, _limit?: string): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>(this.apiUrl + '?statusLive=' + _statusLive + '&_page=' + _page + '&_limit=' + _limit);
  }


  /* Sem paginação no server */
  // public getLivesWithFlag(): Observable<ResponsePageable> {
  //   return this.http.get<ResponsePageable>(this.apiUrl);
  // }

  public postLives(live: Live): Observable<Live> {
    return this.http.post<Live>(this.apiUrl, live, this.httpOptions);
  };

  public putLive(live: Live): Observable<any> {
    const url = `${this.apiUrl}/${live.id}`;
    return this.http.put<Live>(url, live, this.httpOptions).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  };

}
