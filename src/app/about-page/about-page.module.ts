import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutPageComponent } from './about-page.component';
import { AboutPageRoutingModule } from './about-page.routing.module';

const DECLARATIONS = [
  AboutPageComponent,
];
/**
 * The page which houses a title and the community list, as described in community-list.component
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AboutPageRoutingModule
  ],
  declarations: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class AboutPageModule {

}
