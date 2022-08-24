import { Component } from '@angular/core';
import { AboutComponent as BaseComponent } from '../../../../app/about/about.component';

/**
 * This component represents a wrapper for the horizontal navbar and the header
 */
@Component({
  selector: 'ds-about-wrapper',
  // styleUrls: ['header-navbar-wrapper.component.scss'],
  styleUrls: ['./app/about/about.component.scss'],
  // templateUrl: 'header-navbar-wrapper.component.html',
  templateUrl: './app/about/about.component.html',
})
export class AboutComponent extends BaseComponent {
}
