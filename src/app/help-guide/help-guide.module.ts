import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HelpPageComponent } from './help-guide.component';
import { HelpPageRoutingModule } from './help-guide.routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer'

const DECLARATIONS = [
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HelpPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [
    ...DECLARATIONS
  ],
  exports: [
    ...DECLARATIONS,
  ],
})
export class HelpPageModule {

}
