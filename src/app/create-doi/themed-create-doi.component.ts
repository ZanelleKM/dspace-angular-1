import { Component } from '@angular/core';
import { ThemedComponent } from '../shared/theme-support/themed.component';
import { CreateDoiComponent } from './create-doi.component';

/**
 * Themed wrapper for CommunityListPageComponent
 */
@Component({
  selector: 'ds-themed-create-doi',
  styleUrls: [],
  templateUrl: '../shared/theme-support/themed.component.html',
})
export class ThemedCreateDoiComponent extends ThemedComponent<CreateDoiComponent> {
  protected getComponentName(): string {
    return 'CreateDoiComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(
      `../../themes/${themeName}/app/create-doi/create-doi.component`
    );
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./create-doi.component`);
  }
}
