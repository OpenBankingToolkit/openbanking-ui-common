import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ForgerockCssVarsService, IPalette } from '../../services/cssvars.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'forgerock-customization-palette-background',
  templateUrl: './palette-background.component.html',
  styleUrls: ['../palette/palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteBackgroundComponent implements OnInit, OnDestroy {
  formSubscription: Subscription;
  themesControl = new FormControl('theme');
  themeNames: string[] = ['light', 'dark'];
  foregroundThemeObject: { [key: string]: IPalette };
  backgroundThemeObject: { [key: string]: IPalette };
  foregroundPaletteProps: string[];
  backgroundPaletteProps: string[];

  constructor(private cssVarsService: ForgerockCssVarsService) {}

  ngOnInit() {
    this.foregroundPaletteProps = this.cssVarsService.getPalettePropsByType('foreground');
    this.backgroundPaletteProps = this.cssVarsService.getPalettePropsByType('background');

    this.foregroundThemeObject = this.cssVarsService.getThemeObjectByType('foreground');
    this.backgroundThemeObject = this.cssVarsService.getThemeObjectByType('background');
    this.formSubscription = this.themesControl.valueChanges
      .pipe(filter(value => value !== ''))
      .subscribe((value: string) => {
        this.cssVarsService.applyForegroundTheme(
          this.foregroundThemeObject[value === 'light' ? 'mat-light-theme-foreground' : 'mat-dark-theme-foreground']
        );
        this.cssVarsService.applyBackgroundTheme(
          this.backgroundThemeObject[value === 'light' ? 'mat-light-theme-background' : 'mat-dark-theme-background']
        );
        this.themesControl.setValue('');
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  getColor(type: string, color) {
    return `rgba(var(--palette-${type}-${color}), var(--palette-${type}-${color}-alpha, 1))`;
  }

  getCssVarValue(type: string, color: string): string {
    const rgb = this.cssVarsService.getCssVarValue(`--palette-${type}-${color}`);
    const alpha = this.cssVarsService.getCssVarValue(`--palette-${type}-${color}-alpha`);
    return `rgba(${rgb}, ${alpha || 1})`;
  }

  changeColor(type: string, color: string, value: string) {
    this.cssVarsService.setCssVarValue(`--palette-${type}-${color}`, value.match(/\(([^)]+)\)/)[1]);
  }
}
