import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewlocationsRoutingModule } from './newlocations-routing.module';
import { NewlocationsComponent } from './newlocations.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [NewlocationsComponent],
  imports: [
    CommonModule,
    NewlocationsRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    GooglePlaceModule,
  ],
})
export class NewlocationsModule {}
