import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkTreeModule } from '@angular/cdk/tree';

import { ThemedCreateDoiComponent } from './themed-create-doi.component';
import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';

/**
 * RouterModule to help navigate to the page with the community list tree
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ThemedCreateDoiComponent,
        pathMatch: 'full',
        resolve: {
          breadcrumb: I18nBreadcrumbResolver
        },
        data: { title: 'create-doi.tabTitle', breadcrumbKey: 'create-doi' }
      }
    ]),
    CdkTreeModule,
  ],
})
export class CreateDoiRoutingModule {
}