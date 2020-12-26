import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Live } from '../models/live.model';
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

  constructor(private httpClient: HttpClient) { }

  /* Com paginação no server */
  public obterLivesPaginadas(_statusLive: string, _page?: string, _limit?: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '?statusLive=' + _statusLive + '&_page=' + _page + '&_limit=' + _limit);
  }



  /* Sem paginação no server */
  // public getLivesWithFlag(): Observable<ResponsePageable> {
  //   return this.httpClient.get<ResponsePageable>(this.apiUrl);
  // }

  public postLives(live: Live): Observable<Live> {
    return this.httpClient.post<Live>(this.apiUrl, live, this.httpOptions);
  }

}
