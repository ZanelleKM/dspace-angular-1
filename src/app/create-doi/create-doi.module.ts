import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateDoiComponent } from './create-doi.component';
import { CreateDoiRoutingModule } from './create-doi.routing.module';
import { ThemedCreateDoiComponent } from './themed-create-doi.component';

const DECLARATIONS = [
    CreateDoiComponent,
    ThemedCreateDoiComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateDoiRoutingModule
  ],
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class CreateDoiModule {

}