import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})

export class MenuModule {}
