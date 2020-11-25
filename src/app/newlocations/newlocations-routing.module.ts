import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewlocationsComponent } from './newlocations.component';

const routes: Routes = [
  {
    path: '',
    component: NewlocationsComponent,
    data: {
      breadcrumb: 'New Location',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewlocationsRoutingModule {}
