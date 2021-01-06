import { LiveUpdateComponent } from 'src/app/components/live-update/live-update.component';
import { Component, OnInit, Inject } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Live } from 'src/app/shared/models/live.model';
import { LiveDeleteComponent } from '../live-delete/live-delete.component';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesAssistir: Live[]|any;
  livesAssistida: Live[]|any;
  livesAssistindo: Live[]|any;
  livesEspeciais: Live[]|any;

  assistir: boolean = false;
  assistindo: boolean = false;
  assistida: boolean = false;
  especiais: boolean = false;

  constructor(
    private liveService: LiveService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private dialogRefUpdate: MatDialogRef<LiveUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.obterLivesAssistir();
    this.obterLivesAssistindo();
    this.obterLivesAssistida();
    this.obterLivesEspeciais();
  }


  obterLivesAssistir(): void {
    this.liveService.obterLivesPaginadas('assistir', '1', '9').subscribe(dados => {
      this.livesAssistir = dados;

      this.livesAssistir.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistir = true;

    });
  }

  obterLivesAssistindo(): void {
    this.liveService.obterLivesPaginadas('assistindo', '1', '6').subscribe(dados => {
      this.livesAssistindo = dados;

      this.livesAssistindo.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistindo = true;

    });
  }

  obterLivesAssistida(): void {
    this.liveService.obterLivesPaginadas('assistida', '1', '6').subscribe(dados => {
      this.livesAssistida = dados;

      this.livesAssistida.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.assistida = true;

    });
  }


  obterLivesEspeciais(): void {
    this.liveService.obterLivesPaginadas('especiais', '1', '24').subscribe(dados => {
      this.livesEspeciais = dados;

      this.livesEspeciais.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string; }) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.especiais = true;

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

  getLivePorId(live: Live) {
    this.liveService.getLivePorId(live).subscribe(result => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = '400px';
      dialogConfig.data = {
        id: result.id,
        liveName: result.liveName,
        channelName: result.channelName,
        liveDate: result.liveDate,
        liveLink: result.liveLink,
        liveTime: result.liveTime,
        statusLive: result.statusLive
      }
      this.dialogRefUpdate = this.dialog.open(LiveUpdateComponent, dialogConfig);
      console.log("DADOS CARREGADOS NO MODAL:");
      console.log(dialogConfig.data);

      this.dialogRefUpdate.afterClosed().subscribe(result => {
        console.log('DIALOG FECHADO!');
      });


    });
  }

}
