import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulePickerPage } from './module-picker.page';

const routes: Routes = [
  {
    path: '',
    component: ModulePickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulePickerPageRoutingModule {}
