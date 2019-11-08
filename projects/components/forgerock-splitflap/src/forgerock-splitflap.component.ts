import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  HostBinding,
  ElementRef
} from '@angular/core';
import _merge from 'lodash-es/merge';

const emptyChar = '\xa0';
const fillWithEmptyChar = (value: string | number, length: number) =>
  String(value)
    .substring(0, length)
    .replace(/ /g, emptyChar);

export enum ISplitflapSizes {
  XXL = 'XXL',
  XL = 'XL',
  L = 'L',
  M = 'M',
  S = 'S',
  XS = 'XS'
}

const characterSizes: { [key in ISplitflapSizes]: number } = {
  XXL: 96,
  XL: 72,
  L: 54,
  M: 40,
  S: 30,
  XS: 24
};

@Component({
  selector: 'forgerock-splitflap',
  template: `
    <forgerock-splitflap-character
      *ngFor="let character of characters"
      [value]="character"
      [deck]="deck"
      [time]="time"
      [size]="size"
    ></forgerock-splitflap-character>
  `,
  styleUrls: ['./forgerock-splitflap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockSplitFlapComponent implements OnInit, OnChanges {
  @Input() value = '';
  @Input() autoSize: boolean;
  @HostBinding('class') @Input() size: ISplitflapSizes;
  @Input() deck = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  @Input() time = 0.3;
  length: number;
  characters: string[] = [];

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.length = String(changes.value.currentValue).length;
      this.characters = Array(this.length).fill('\xa0');
      this.setCharacters(fillWithEmptyChar(changes.value.currentValue, this.length));
    }
  }

  resetAll() {
    this.characters = Array(this.length).fill('\xa0');
    this.setCharacters(fillWithEmptyChar(this.value, this.length));
  }

  setCharacters(value = '') {
    if (this.autoSize) {
      this.size = this.getAutoSize();
    }
    this.characters = String(value).split('');
  }

  getAutoSize() {
    const componentWidth = this._elementRef.nativeElement.offsetWidth;
    const sizeNames = <ISplitflapSizes[]>Object.keys(ISplitflapSizes);

    for (let i = 0; i < sizeNames.length; i++) {
      const sizeName = sizeNames[i];
      const size = characterSizes[sizeName] + 4; // 2 being the margin
      if (Math.ceil(this.length * size) / componentWidth <= 1) {
        return sizeName;
      }
    }
    return ISplitflapSizes.XS;
  }
}
