import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: ''
    ,
    redirectTo: 'record-list',
    pathMatch: 'full'
  },
  {
    path: 'record-list',
    loadChildren: () => import('./record/record-list/record-list.module')
      .then( m => m.RecordListPageModule)
  },  {
    path: 'record-detail',
    loadChildren: () => import('./record/record-detail/record-detail.module').then( m => m.RecordDetailPageModule)
  },
  {
    path: 'module-picker',
    loadChildren: () => import('./module/module-picker/module-picker.module').then( m => m.ModulePickerPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
