import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsComponent } from './locations.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    data: {
      breadcrumb: 'Available',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}