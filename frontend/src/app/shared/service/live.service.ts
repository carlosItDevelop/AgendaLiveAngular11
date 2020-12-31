import { Live } from './../models/live.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';

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
  liveForm: FormGroup | any;

  constructor(
    private http: HttpClient,
    errorHandler: ErrorHandler,
  ) { }




  initializeFormGroup() {
    this.liveForm.setValue({
      id: '',
      liveName: '',
      channelName: '',
      liveLink: '',
      liveDate: '',
      liveTime: '',
      statusLive: 'assistir'
    });
  }

    // Decidir se vou usar ou mantenho o getLivePorId
    // public populateForm(form: FormGroup, live: Live) {
    //   form.setValue(_.omit(live,'urlSafe'));
    //   return this.liveForm.value;
    // }

  /* Com paginação no server */
  public obterLivesPaginadas(_statusLive: string, _page?: string, _limit?: string): Observable<Live[]> {
    return this.http.get<Live[]>(this.apiUrl + '?statusLive=' + _statusLive + '&_page=' + _page + '&_limit=' + _limit);
  }

  getLivePorId(live: Live): Observable<Live>{
    let id = live.id;
    return this.http.get<Live>(`${this.apiUrl}/${id}`);
  }


  public postLives(live: Live): Observable<Live> {
    return this.http.post<Live>(this.apiUrl, live, this.httpOptions);
  };

  public putLive(live: Live): Observable<Live> {
    const url = `${this.apiUrl}/${live.id}`;
    return this.http.put<Live>(url, live, this.httpOptions);
    // .pipe(
    //   map((obj) => obj),
    //   catchError(e => this.errorHandler(e));
    // );
  };

}
