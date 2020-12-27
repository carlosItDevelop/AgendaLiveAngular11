import { LiveTableComponent } from './components/live-table/live-table.component';
import { LiveDeleteComponent } from './components/live-delete/live-delete.component';
import { LiveUpdateComponent } from './components/live-update/live-update.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'lives/update/:id',
    component: LiveUpdateComponent
  },
  {
    path: 'lives/delete/:id',
    component: LiveDeleteComponent
  },
  {
    path: 'lives/table',
    component: LiveTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
