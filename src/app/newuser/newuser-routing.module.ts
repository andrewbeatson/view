import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewuserComponent } from './newuser.component';

const routes: Routes = [
  {
    path: '',
    component: NewuserComponent,
    data: {
      breadcrumb: 'Create new User',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewuserRoutingModule {}
