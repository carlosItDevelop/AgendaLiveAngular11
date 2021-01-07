import { CoreService } from './../../shared/service/core.service';
import { LiveService } from 'src/app/shared/service/live.service';
import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusDaLiveService } from 'src/app/shared/service/status-da-live.service';
import { StatusDaLive } from 'src/app/shared/models/statusdalive.model';


import * as moment from 'moment';
import { Live } from 'src/app/shared/models/live.model';

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css']
})
export class LiveUpdateComponent implements OnInit {

  statusDaLive: StatusDaLive | any;
  liveFormUpdate: FormGroup | any;
  liveOfUpdate: Live | any;



  constructor(
    private coreService: CoreService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LiveUpdateComponent>,
    private liveService: LiveService,
    private statusDasLivesService: StatusDaLiveService,
    @Inject(MAT_DIALOG_DATA) public data: any


  ) { }

  ngOnInit(): void {

    this.liveFormUpdate = this.fb.group({
      id: ['', Validators.required],
      // liveName: ['', Validators.minLength(3)], // Falhando na validação indicidual *ngIf
      // channelName: ['', Validators.minLength(2)],  // Falhando na validação individual *ngIf

      liveName: ['', [Validators.required, Validators.minLength(2)]],
      channelName: ['', [Validators.required, Validators.minLength(3)]],

      liveLink: ['', [Validators.required, Validators.minLength(5)]],

      liveDate: ['', [
        Validators.required
         ]
      ],

      liveTime: ['', [Validators.required]],
      statusLive: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.liveFormUpdate.setValue(this.data);

    this.statusDasLivesService.obterStatusDasLives().subscribe(result => {
      this.statusDaLive = result;
    });
  }

  atualizarLive(): void {
    let newDate: moment.Moment = moment.utc(this.liveFormUpdate.value.liveDate);
    this.liveFormUpdate.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveFormUpdate.value.liveTime + ":00";

    // Fazer assim depois que ficarem claros os propóitos: (EP)
    //this.liveOfUpdate = Object.assign({}, this.liveOfUpdate, this.liveFormUpdate.value)
    //this.liveService.putLive(this.liveOfUpdate).subscribe(() => {

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
