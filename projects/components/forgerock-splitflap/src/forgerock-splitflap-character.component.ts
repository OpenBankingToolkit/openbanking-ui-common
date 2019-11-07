import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  HostBinding,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import _merge from 'lodash-es/merge';

@Component({
  selector: 'forgerock-splitflap-character',
  template: `
    <div class="back top">{{ nextCharacter }}</div>
    <div class="back bottom">{{ character }}</div>
    <div class="front top" [ngClass]="flipClass" [ngStyle]="topFlipStyle">
      {{ character }}
    </div>
    <div class="front bottom" [ngClass]="flipClass" [ngStyle]="bottomFlipStyle">
      {{ nextCharacter }}
    </div>
  `,
  styleUrls: ['./forgerock-splitflap-character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockSplitFlapCharacterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() size: string;
  @Input() theme = 'dark';
  @HostBinding('class') get class() {
    return `${this.size} ${this.theme}`;
  }
  @Input() value: string;
  @Input() deck = '\xa0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-!:;';
  @Input() time = 0.05;
  deckIdx = 0;
  character = '';
  nextCharacter = '';
  moveToCharacter = '';
  timeout: any;
  transitionTime: string;
  flipClass = {
    flip: 0
  };
  topFlipStyle = {
    'transition-duration': '0'
  };
  bottomFlipStyle = {
    'transition-duration': '0',
    'transition-delay': '0'
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.transitionTime = String(this.time) + 's';
    this.moveToCharacter = this.value;
    this.startFlipping();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value && !changes.value.firstChange) {
      this.moveToCharacter = changes.value.currentValue;
      if (!this.timeout) this.startFlipping();
    }
    if (changes.time && !changes.time.firstChange) {
      this.transitionTime = String(changes.time.currentValue) + 's';
    }
  }

  resetCharacters() {
    this.topFlipStyle['transition-duration'] = '0';
    this.bottomFlipStyle['transition-duration'] = '0';
    this.bottomFlipStyle['transition-delay'] = '0';
    this.flipClass.flip = 0;
    this.character = this.deck.charAt(this.deckIdx);

    if (this.deckIdx + 1 < this.deck.length) {
      this.nextCharacter = this.deck.charAt(this.deckIdx + 1);
    } else {
      this.nextCharacter = this.deck.charAt(0);
    }
  }

  startFlipping() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.resetCharacters();

    if (this.character !== this.moveToCharacter) {
      this.topFlipStyle['transition-duration'] = this.transitionTime;
      this.bottomFlipStyle['transition-duration'] = this.transitionTime;
      this.bottomFlipStyle['transition-delay'] = this.transitionTime;
      this.flipClass.flip = 1;
      this.timeout = setTimeout(() => {
        this.deckIdx = this.deckIdx + 1;
        if (this.deckIdx >= this.deck.length) this.deckIdx = 0;
        this.startFlipping();
        this.changeDetectorRef.detectChanges();
      }, this.time * 1000);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
}
