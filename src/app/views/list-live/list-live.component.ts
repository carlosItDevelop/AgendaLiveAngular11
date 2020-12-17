import { LiveService } from './../../shared/service/live.service';
import { Live } from './../../shared/models/live.model';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';


@Component({
  selector: 'app-list-live',
  templateUrl: './list-live.component.html',
  styleUrls: ['./list-live.component.css']
})
export class ListLiveComponent implements OnInit {

  livesPrevious: any | Live[]
  //livesPrevious: Live[]

  constructor(public liveService: LiveService) {

   }

  ngOnInit(): void {
    this.getLives();
  }

  getLives(): void {
    // this.liveService.getLivesWithFlag('previous').subscribe(data => {
    //let livesPrevious: Live[]
    this.liveService.getLivesWithFlag().subscribe(data => {
      this.livesPrevious = data;
      console.log(data);
    });
  }

}
