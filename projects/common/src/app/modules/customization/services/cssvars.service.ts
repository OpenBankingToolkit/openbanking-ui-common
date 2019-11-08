import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import _merge from 'lodash-es/merge';
import _get from 'lodash-es/get';

import { ForgerockCustomizationToken } from '../tokens';
import { ForgerockCustomization } from '../customization.module';

export interface IPalette {
  [key: string]: string;
}

export type IThemeType = 'primary' | 'accent' | 'warn' | 'foreground' | 'background';

const paletteProps: string[] = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A100',
  'A200',
  'A400',
  'A700'
];

const paletteForegroundProps: string[] = [
  'base',
  'divider',
  'dividers',
  'disabled',
  'disabled-button',
  'disabled-text',
  'hint-text',
  'secondary-text',
  'icon',
  'icons',
  'text',
  'slider-min',
  'slider-off',
  'slider-off-active'
];

const paletteBackgroundProps: string[] = [
  'status-bar',
  'app-bar',
  'background',
  'hover',
  'card',
  'dialog',
  'disabled-button',
  'raised-button',
  'focused-button',
  'selected-button',
  'selected-disabled-button',
  'disabled-button-toggle',
  'unselected-chip',
  'disabled-list-option'
];

@Injectable({
  providedIn: 'root'
})
export class ForgerockCssVarsService {
  private _init = false;
  private _matPalettes: {
    [key: string]: IPalette;
  } = {};

  private _foregroundPalettes: {
    [key: string]: IPalette;
  } = {};

  private _backgroundPalettes: {
    [key: string]: IPalette;
  } = {};

  private _matPaletteNames: string[] = [];
  private _foregroundPaletteNames: string[] = [];
  private _backgroundPaletteNames: string[] = [];

  constructor(
    @Inject(DOCUMENT) private _document: any,
    @Inject(ForgerockCustomizationToken) private _config: ForgerockCustomization
  ) {
    // Keep in case the palette list changes
    // const cssVars = require('sass-extract-loader!./cssvars.scss');
    // this.parseScssVars(cssVars.global);
  }

  public get matPalettes() {
    return this._matPalettes;
  }

  public get matPaletteNames() {
    return this._matPaletteNames;
  }

  public get foregroundPalettes() {
    return this._foregroundPalettes;
  }

  public get foregroundPaletteNames() {
    return this._foregroundPaletteNames;
  }

  public get backgroundPalettes() {
    return this._backgroundPalettes;
  }

  public get backgroundPaletteNames() {
    return this._backgroundPaletteNames;
  }

  public getThemeNamesByType(type: IThemeType): string[] {
    switch (type) {
      case 'primary':
      case 'accent':
      case 'warn':
        return this.matPaletteNames;
      case 'foreground':
        return this.foregroundPaletteNames;
      case 'background':
        return this.backgroundPaletteNames;
      default:
        return [];
    }
  }

  public getThemeObjectByType(type: IThemeType): { [key: string]: IPalette } {
    switch (type) {
      case 'primary':
      case 'accent':
      case 'warn':
        return this.matPalettes;
      case 'foreground':
        return this.foregroundPalettes;
      case 'background':
        return this.backgroundPalettes;
      default:
        return {};
    }
  }

  public getPalettePropsByType(type: IThemeType): string[] {
    switch (type) {
      case 'primary':
      case 'accent':
      case 'warn':
        return paletteProps;
      case 'foreground':
        return paletteForegroundProps;
      case 'background':
        return paletteBackgroundProps;
      default:
        return [];
    }
  }

  private injectVariables(list: { [key: string]: string }, prefix?: string) {
    Object.keys(list).filter(key =>
      document.documentElement.style.setProperty(prefix ? `${prefix}-${key}` : key, list[key])
    );
  }

  public async init() {
    if (!this._init) {
      this._init = true;
      // Async computed vars load
      const {
        foregroundPalettes,
        backgroundPalettes,
        matPalettes,
        backgroundPaletteNames,
        foregroundPaletteNames,
        matPaletteNames
      } = await import('./cssvars.js');
      this._foregroundPalettes = foregroundPalettes;
      this._backgroundPalettes = backgroundPalettes;
      this._matPalettes = matPalettes;
      this._backgroundPaletteNames = backgroundPaletteNames;
      this._foregroundPaletteNames = foregroundPaletteNames;
      this._matPaletteNames = matPaletteNames;
      this._document.documentElement.setAttribute('style', this._config.cssVars);
    }
    return Promise.resolve();
  }

  public applyTheme(type: string, theme: { [key: string]: string }): void {
    if (!theme) return;

    switch (type) {
      case 'primary':
        this.applyPrimaryTheme(theme);
        break;
      case 'accent':
        this.applyAccentTheme(theme);
        break;
      case 'warn':
        this.applyWarnTheme(theme);
        break;
      case 'foreground':
        this.applyForegroundTheme(theme);
        break;
      case 'background':
        this.applyBackgroundTheme(theme);
        break;
      default:
        break;
    }
  }

  public applyPrimaryTheme = (theme: { [key: string]: string }) => this.injectVariables(theme, '--palette-primary');
  public applyAccentTheme = (theme: { [key: string]: string }) => this.injectVariables(theme, '--palette-accent');
  public applyWarnTheme = (theme: { [key: string]: string }) => this.injectVariables(theme, '--palette-warn');
  public applyForegroundTheme = (theme: { [key: string]: string }) =>
    this.injectVariables(theme, '--palette-foreground');
  public applyBackgroundTheme = (theme: { [key: string]: string }) =>
    this.injectVariables(theme, '--palette-background');

  public getCssVarValue(cssVar: string) {
    return this._document.documentElement.style.getPropertyValue(cssVar);
  }

  public setCssVarValue(cssVar: string, value: string) {
    const [r, g, b, a = '1'] = value.split(',');
    this._document.documentElement.style.setProperty(cssVar, [r, g, b].join(', '));
    if (this.getCssVarValue(cssVar) || parseInt(a, 10) < 1) {
      this._document.documentElement.style.setProperty(`${cssVar}-alpha`, a);
    }
  }

  public export(): IPalette {
    return Object.values(this._document.documentElement.style).reduce<IPalette>((prev: IPalette, current: string) => {
      if (current.startsWith('--')) {
        return Object.assign(prev, {
          [current]: this.getCssVarValue(current)
        });
      }
      return prev;
    }, {});
  }
}

// Keep in case the palette list changes
// function parseScssVars(vars: any = {}) {
//   const palettes = Object.keys(vars).filter(key => key.startsWith('$mat-'));
//   const foregroundPalettes = palettes.filter(key => key.endsWith('-foreground'));
//   const backgroundPalettes = palettes.filter(key => key.endsWith('-background'));
//   const matPalettes = palettes.filter(key => !key.endsWith('-background') && !key.endsWith('-foreground'));
//   const sassToJS = (prev, current) => {
//     return Object.assign({}, prev, {
//       [removePrefixIfExists(current)]: formatColors(vars[current], current)
//     });
//   };

//   console.log({
//     foregroundPalettes: foregroundPalettes.reduce(sassToJS, {}),
//     backgroundPalettes: backgroundPalettes.reduce(sassToJS, {}),
//     matPalettes: matPalettes.reduce(sassToJS, {}),
//     backgroundPaletteNames: backgroundPalettes.map(key => removePrefixIfExists(key)),
//     foregroundPaletteNames: foregroundPalettes.map(key => removePrefixIfExists(key)),
//     matPaletteNames: matPalettes.map(key => removePrefixIfExists(key))
//   });
// }

// function formatColors(object: any = {}, key = null) {
//   key = key ? removePrefixIfExists(key) : key;
//   if (object.type === 'SassMap') {
//     return Object.keys(object.value).reduce((prev, current) => {
//       return Object.assign(
//         {},
//         prev,
//         formatColors(object.value[current], key.startsWith('mat-') ? current : `${key}-${current}`)
//       );
//     }, {});
//   } else if (object.type === 'SassColor') {
//     return {
//       [key]: `${object.value.r}, ${object.value.g}, ${object.value.b}`,
//       [`${key}-alpha`]: object.value.a
//     };
//   }
// }

// function removePrefixIfExists(key) {
//   return key.startsWith('$') ? key.substr(1) : key;
// }
