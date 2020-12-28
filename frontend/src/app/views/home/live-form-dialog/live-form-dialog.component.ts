
import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { StatusDaLive } from 'src/app/shared/models/statusdalive.model';
import { StatusDaLiveService } from 'src/app/shared/service/status-da-live.service';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm: FormGroup | any;
  public statusDaLive: StatusDaLive | any;

  constructor(
        private dialogRef: MatDialogRef<LiveFormDialogComponent>,
        private fb: FormBuilder,
        private liveService: LiveService,
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
    });


    this.statusDasLivesService.obterStatusDasLives().subscribe(statusDaLive => {
      this.statusDaLive = statusDaLive;
      //console.log(estados);
    })

  }

  createLive(): void{
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.liveForm.value.liveTime;
    this.liveService.postLives(this.liveForm.value).subscribe(result => {});
    this.cancel();
    window.location.reload();
  }

  cancel(): void{
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
