import { HomeComponent } from './views/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListLiveComponent } from './views/list-live/list-live.component';
import { ListLiveDemoComponent } from './views/list-live-demo/list-live-demo.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocalDateTimePipe } from './shared/pipe/local-date-time.pipe';
import { MatChipsModule } from '@angular/material/chips';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListLiveComponent,
    ListLiveDemoComponent,
    LocalDateTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FlexLayoutModule,
    MatChipsModule
  ],
  providers: [
    LocalDateTimePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
