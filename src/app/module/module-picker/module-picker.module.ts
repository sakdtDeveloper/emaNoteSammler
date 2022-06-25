import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulePickerPageRoutingModule } from './module-picker-routing.module';

import { ModulePickerPage } from './module-picker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulePickerPageRoutingModule
  ],
  declarations: [ModulePickerPage]
})
export class ModulePickerPageModule {}
