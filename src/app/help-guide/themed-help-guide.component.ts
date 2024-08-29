import { Component } from '@angular/core';
import { ThemedComponent } from '../shared/theme-support/themed.component';
import { HelpPageComponent } from './help-guide.component';

@Component({
  selector: 'ds-themed-help-page',
  styleUrls: [],
  templateUrl: '../shared/theme-support/themed.component.html',
})
export class ThemedHelpPageComponent extends ThemedComponent<HelpPageComponent> {
  protected getComponentName(): string {
    return 'HelpPageComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../themes/${themeName}/app/help-guide/help-guide.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./help-guide.component`);
  }
}
