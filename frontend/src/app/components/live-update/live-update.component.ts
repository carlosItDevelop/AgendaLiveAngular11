import { CoreService } from './../../shared/service/core.service';
import { LiveService } from './../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StatusDaLiveService } from 'src/app/shared/service/status-da-live.service';
import { StatusDaLive } from 'src/app/shared/models/statusdalive.model';
import * as moment from 'moment';

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css']
})
export class LiveUpdateComponent implements OnInit {

  public liveForm: FormGroup | any;
  public statusDaLive: StatusDaLive | any;



  constructor(
    private coreService: CoreService,

    private dialogRef: MatDialogRef<LiveUpdateComponent>,
    private fb: FormBuilder,
    private rest: LiveService,
    private statusDasLivesService: StatusDaLiveService

  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', Validators.required],
      channelName: ['', Validators.required],
      liveLink: ['', Validators.required],
      liveDate: ['', Validators.required],
      liveTime: ['', Validators.required],
      statusLive: ['', Validators.required]
    })

    this.statusDasLivesService.obterStatusDasLives().subscribe(statusDaLive => {
      this.statusDaLive = statusDaLive;
      //console.log(statusDaLive);
    });

  }





  atualizarLive(): void {
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
    this.rest.putLive(this.liveForm.value).subscribe(() => {
      this.coreService.showMessage('Paciente atualizado com sucesso!');
      this.cancelar();
      window.location.reload();
    });
  }

  // atualizarLive(): void {

  //   let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
  //   this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
  //   this.rest.putLive(this.liveForm.value).subscribe();
  //   this.coreService.showMessage('Live atualizada com sucesso!', false)
  //   this.cancelar();
  //   window.location.reload();

  // }

  cancelar(): void {
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
