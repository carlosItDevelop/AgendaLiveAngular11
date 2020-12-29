import { CoreService } from './../../shared/service/core.service';
import { LiveService } from './../../shared/service/live.service';
import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusDaLiveService } from 'src/app/shared/service/status-da-live.service';
import { StatusDaLive } from 'src/app/shared/models/statusdalive.model';


import * as moment from 'moment';

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css']
})
export class LiveUpdateComponent implements OnInit {

  public liveFormUpdate: FormGroup | any
  public statusDaLive: StatusDaLive | any;



  constructor(
    private coreService: CoreService,

    private dialogRef: MatDialogRef<LiveUpdateComponent>,
    private fb: FormBuilder,
    private liveService: LiveService,
    private statusDasLivesService: StatusDaLiveService,
    @Inject(MAT_DIALOG_DATA) public data: any


  ) { }

  ngOnInit(): void {
    this.liveFormUpdate = this.fb.group({
      id: [''],
      liveName: ['', Validators.required],
      channelName: ['', Validators.required],
      liveLink: ['', Validators.required],
      liveDate: ['', Validators.required],
      liveTime: ['', Validators.required],
      statusLive: ['', Validators.required]
    })

    this.statusDasLivesService.obterStatusDasLives().subscribe(statusDaLive => {
      this.statusDaLive = statusDaLive;
    });
  }

  atualizarLive(): void {
    let newDate: moment.Moment = moment.utc(this.liveFormUpdate.value.liveDate);
    this.liveFormUpdate.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveFormUpdate.value.liveTime;

    this.liveService.putLive(this.liveFormUpdate.value).subscribe(() => {
      this.coreService.showMessage('Paciente atualizado com sucesso!');
      this.cancelar();
      window.location.reload();
    });
  }
  cancelar(): void {
    this.dialogRef.close();
    this.liveFormUpdate.reset();
  }

}
