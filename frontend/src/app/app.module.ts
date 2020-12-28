import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuModule } from './shared/menu/menu.module';
import { HomeComponent } from './views/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { LiveUpdateComponent } from './components/live-update/live-update.component';
import { LiveDeleteComponent } from './components/live-delete/live-delete.component';
import { LiveTableComponent } from './components/live-table/live-table.component';
import { LiveListComponent } from './components/live-list/live-list.component';
import { LiveAddComponent } from './components/live-add/live-add.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListLiveDemoComponent,
    LocalDateTimePipe,    
    LiveUpdateComponent,
    LiveDeleteComponent,
    LiveTableComponent,
    LiveListComponent,
    LiveAddComponent
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
    MatChipsModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MenuModule,
    MatSelectModule
  ],
  providers: [
    LocalDateTimePipe,
    MatSnackBar,
    {
      provide: MatDialogRef,
      useValue: {}
    }    
  ],
  bootstrap: [AppComponent],
  entryComponents: [LiveUpdateComponent, LiveAddComponent] // Retirar depois, pois está depreciado (não é mais necessário!)
})
export class AppModule { }
