import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {

  public liveForm: FormGroup | any;

  constructor(
        public dialogRef: MatDialogRef<LiveFormDialogComponent>,
        private fb: FormBuilder,
        private rest: LiveService
    ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
        liveName: ['', Validators.required],
        channelName: ['', Validators.required],
        liveLink: ['', Validators.required],
        liveDate: ['2020-12-12T01:00', Validators.required],
        liveTime: ['', Validators.required]
    });
  }

  createLive(): void{
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    this.cancel();
  }

  cancel(): void{
    this.dialogRef.close();
    this.liveForm.reset();
  }

}
