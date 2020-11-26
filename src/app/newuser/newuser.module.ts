import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewuserRoutingModule } from './newuser-routing.module';
import { NewuserComponent } from './newuser.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NewuserComponent],
  imports: [CommonModule, NewuserRoutingModule, SharedModule, NgxSpinnerModule],
})
export class NewuserModule {}
