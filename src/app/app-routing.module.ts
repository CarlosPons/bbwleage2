import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { GstMatchComponent } from './gst-match/gst-match.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstTableComponent } from './gst-table/gst-table.component';

const routes: Routes = [
  {
    path: 'matchResult',
    component: GstMatchComponent
  },
  {
    path: 'editPlayer/:coach/:id',
    component: GstEditComponent
  },
  {
    path: 'teamview/:coach',
    component: GstGetComponent
  },
  {
    path: 'tables',
    component: GstTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
