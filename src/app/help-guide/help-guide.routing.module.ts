import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkTreeModule } from '@angular/cdk/tree';

import { ThemedHelpPageComponent } from './themed-help-guide.component';
import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';

/**
 * RouterModule to help navigate to the page with the community list tree
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ThemedHelpPageComponent,
        pathMatch: 'full',
        resolve: {
          breadcrumb: I18nBreadcrumbResolver
        },
        data: { title: 'help.tabTitle', breadcrumbKey: 'help' }
      }
    ]),
    CdkTreeModule,
  ],
})
export class HelpPageRoutingModule {
}
