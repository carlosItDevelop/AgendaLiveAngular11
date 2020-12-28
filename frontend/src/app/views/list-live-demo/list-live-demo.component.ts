import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiveService } from './../../shared/service/live.service';
import { Live } from './../../shared/models/live.model';
import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LiveUpdateComponent } from 'src/app/components/live-update/live-update.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LiveDeleteComponent } from 'src/app/components/live-delete/live-delete.component';




@Component({
  selector: 'app-list-live-demo',
  templateUrl: './list-live-demo.component.html',
  styleUrls: ['./list-live-demo.component.css']
})
export class ListLiveDemoComponent implements OnInit {

  formUpdate: FormGroup = this.fb.group({
    id: [''],
    liveName: ['', Validators.required],
    channelName: ['', Validators.required],
    liveLink: ['', Validators.required],
    liveDate: ['', Validators.required],
    liveTime: ['', Validators.required],
    statusLive: ['', Validators.required]
  });

  livesAssistir: any | Live[]
  livesAssistida: any | Live[]
  livesAssistindo: any | Live[]


  assistir: boolean = false;
  assistindo: boolean = false;
  assistida: boolean = false;

  constructor(
    private liveService: LiveService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private dialogRefUpdate: MatDialogRef<LiveUpdateComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.obterLivesAssistir();
    this.obterLivesAssistindo();
    this.obterLivesAssistida();
  }


  obterLivesAssistir(): void {
    this.liveService.obterLivesPaginadas('assistir', '1', '5').subscribe(dados => {
      this.livesAssistir = dados;

      this.livesAssistir.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistir = true;

    });
  }

  obterLivesAssistindo(): void {
    this.liveService.obterLivesPaginadas('assistindo', '1', '5').subscribe(dados => {
      this.livesAssistindo = dados;

      this.livesAssistindo.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistindo = true;

    });
  }

  obterLivesAssistida(): void {
    this.liveService.obterLivesPaginadas('assistida', '1', '5').subscribe(dados => {
      this.livesAssistida = dados;

      this.livesAssistida.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistida = true;

    });
  }

  openLiveForDelete(): void {
    const dialogRef = this.dialog.open(LiveDeleteComponent, {
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  getLiveForUpdate(live: Live) {
    this.formUpdate = this.liveService.populateForm(live);

    console.log('ANTES DE ABRIR O DIALOG:');
    console.log(this.formUpdate);
    console.log('==========================');
    

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    dialogConfig.data =  this.formUpdate;


    console.log('ANTES AINDA: DIALOGCONFIG.DATA');  
    console.log(dialogConfig.data);
    console.log('===============================');  

    this.dialogRefUpdate = this.dialog.open(LiveUpdateComponent, dialogConfig);

    this.dialogRefUpdate.afterClosed().subscribe(result => {
      console.log('APÓS MODAL FECHADO:');
      console.log(this.formUpdate);
    });
  }

}
