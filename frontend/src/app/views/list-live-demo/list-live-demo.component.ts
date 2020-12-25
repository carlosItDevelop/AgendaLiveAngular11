import { LiveService } from './../../shared/service/live.service';
import { Live } from './../../shared/models/live.model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-list-live-demo',
  templateUrl: './list-live-demo.component.html',
  styleUrls: ['./list-live-demo.component.css']
})
export class ListLiveDemoComponent implements OnInit {

  livesPrevious: any | Live[]
  previous: boolean = false;

  constructor(private liveService: LiveService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getLives();
  }

  getLives(): void {
    // this.liveService.getLivesWithFlag('previous').subscribe(data => {
    this.liveService.getLivesWithFlag('1','5').subscribe(dados => {
      this.livesPrevious = dados;

      this.livesPrevious.forEach((live: { urlSafe: SafeResourceUrl; liveLink: string;}) => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });

      this.previous = true;

    });
  }
}
