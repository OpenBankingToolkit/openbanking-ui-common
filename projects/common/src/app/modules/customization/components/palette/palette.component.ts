import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ForgerockCssVarsService, IPalette, IThemeType } from '../../services/cssvars.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'forgerock-customization-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteComponent implements OnInit, OnDestroy {
  @Input() type: IThemeType;
  formSubscription: Subscription;
  themesControl = new FormControl('theme');
  themeNames: string[];
  themeObject: { [key: string]: IPalette };
  paletteProps: string[];

  constructor(private cssVarsService: ForgerockCssVarsService) {}

  ngOnInit() {
    this.paletteProps = this.cssVarsService.getPalettePropsByType(this.type);
    this.themeNames = this.cssVarsService.getThemeNamesByType(this.type);
    this.themeObject = this.cssVarsService.getThemeObjectByType(this.type);
    this.formSubscription = this.themesControl.valueChanges
      .pipe(filter(value => value !== ''))
      .subscribe((value: string) => {
        this.cssVarsService.applyTheme(this.type, this.themeObject[value]);
        this.themesControl.setValue('');
      });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  getColor(color) {
    return `rgba(var(--palette-${this.type}-${color}), var(--palette-${this.type}-${color}-alpha, 1))`;
  }

  getCssVarValue(color: string): string {
    const rgb = this.cssVarsService.getCssVarValue(`--palette-${this.type}-${color}`);
    const alpha = this.cssVarsService.getCssVarValue(`--palette-${this.type}-${color}-alpha`);
    return `rgba(${rgb}, ${alpha || 1})`;
  }

  changeColor(color: string, value: string) {
    this.cssVarsService.setCssVarValue(`--palette-${this.type}-${color}`, value.match(/\(([^)]+)\)/)[1]);
  }
}
