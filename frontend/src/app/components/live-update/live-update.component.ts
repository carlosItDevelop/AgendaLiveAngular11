import { CoreService } from './../../shared/service/core.service';
import { LiveService } from 'src/app/shared/service/live.service';
import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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



  public liveFormUpdate: FormGroup =  new FormGroup({
    id: new FormControl(''),
    liveName: new FormControl('', Validators.minLength(3)),
    channelName: new FormControl('', Validators.minLength(2)),
    liveLink: new FormControl('', Validators.required),
    liveDate: new FormControl('', Validators.required),
    liveTime: new FormControl('', Validators.required),
    statusLive: new FormControl('', Validators.required)
  });

  public statusDaLive: StatusDaLive | any;



  constructor(
    private coreService: CoreService,

    private dialogRef: MatDialogRef<LiveUpdateComponent>,
    private liveService: LiveService,
    private statusDasLivesService: StatusDaLiveService,
    @Inject(MAT_DIALOG_DATA) public data: any


  ) { }

  ngOnInit(): void {

    this.liveFormUpdate.setValue(this.data);

    this.statusDasLivesService.obterStatusDasLives().subscribe(statusDaLive => {
      this.statusDaLive = statusDaLive;
    });
  }

  atualizarLive(): void {
    let newDate: moment.Moment = moment.utc(this.liveFormUpdate.value.liveDate);
    this.liveFormUpdate.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveFormUpdate.value.liveTime + ":00";

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
