import { LiveService } from './../../shared/service/live.service';
import { Live } from './../../shared/models/live.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-live',
  templateUrl: './list-live.component.html',
  styleUrls: ['./list-live.component.css']
})
export class ListLiveComponent implements OnInit {

  livesPrevious: any | Live[]
  //livesPrevious: Live[]

  constructor(private liveService: LiveService) {

   }

  ngOnInit(): void {
    this.getLives();
  }

  getLives(): void {
    // this.liveService.getLivesWithFlag('previous').subscribe(data => {
    //let livesPrevious: Live[]
    this.liveService.getLivesWithFlag().subscribe(dados => {
      this.livesPrevious = dados;
      console.log(dados);
    });
  }

}
