import { StatusDaLive } from './../models/statusdalive.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StatusDaLiveService {

  apiUrl = 'http://localhost:3012/statusdalive';

  constructor(private http: HttpClient) { }


  obterStatusDasLives(): Observable<StatusDaLive[]>{
    return this.http.get<StatusDaLive[]>(this.apiUrl);    
  }

}
