import { Data } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponsePageable } from './../models/reponsePageable.model';

import { map, catchError } from 'rxjs/operators';
import { Live } from './../models/live.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LiveFormDialogComponent } from 'src/app/views/home/live-form-dialog/live-form-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';



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


  constructor(
    private http: HttpClient,
    errorHandler: ErrorHandler,
  ) { }


  liveForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    liveName: new FormControl('', Validators.required),
    channelName: new FormControl('', Validators.required),
    liveLink: new FormControl('', Validators.required),
    liveDate: new FormControl('', Validators.required),
    liveTime: new FormControl('', Validators.required),
    statusLive: new FormControl('', Validators.required)
  });  


  initializeFormGroup() {
    this.liveForm.setValue({
      id: null,
      liveName: '',
      channelName: '',
      liveLink: '',
      liveDate: '',
      liveTime: '',
      statusLive: 'assistir'
    });
  }


  populateForm(live: Live) {
    this.liveForm.setValue(_.omit(live,'urlSafe'));
    console.log('DADOS SETADOS NO SERVICE:');
    console.log(this.liveForm.value);
    return this.liveForm.value;
  }

  /* Com paginação no server */
  public obterLivesPaginadas(_statusLive: string, _page?: string, _limit?: string): Observable<ResponsePageable> {
    return this.http.get<ResponsePageable>(this.apiUrl + '?statusLive=' + _statusLive + '&_page=' + _page + '&_limit=' + _limit);
  }

  getLivePorId(live: Live): Observable<Live>{
    let id = live.id;
    return this.http.get<Live>(`${this.apiUrl}/${id}`);    
  }  


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
