import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import _get from 'lodash-es/get';

import { StagesParentComponent } from './stages.parent.component';

interface IStoreAsset {
  imgSrc: string;
  classes: string;
  text: string;
  href: string;
}

@Component({
  selector: 'app-authenticator-push-registration3',
  template: `
    <h1 *ngIf="response.header">{{ response.header }}</h1>
    <h1 *ngIf="!response.header">
      {{
        'STAGES.' + response.stage + '.TITLE'
          | translate
            : {
                clientName: client?.name
              }
      }}
    </h1>
    <form [formGroup]="formGroup" (ngSubmit)="submit()">
      <p>
        {{
          'STAGES.' + response.stage + '.SUBTITLE'
            | translate
              : {
                  clientName: client?.name
                }
        }}
      </p>
      <div class="store-wrapper" fxLayout="row" fxLayoutAlign="center center">
        <a class="store-link" *ngFor="let link of links" [href]="link.href" target="_blank">
          <img [ngClass]="['store', link.classes]" *ngIf="link.imgSrc" [src]="link.imgSrc" [alt]="link.text" />
          <span *ngIf="!link.imgSrc">{{ link.tex }}</span>
        </a>
      </div>
      <button mat-flat-button type="submit" color="accent" [disabled]="formGroup.invalid">
        {{ 'STAGES.' + response.stage + '.SUBMIT' | translate }}
      </button>
    </form>
  `,
  styles: [
    `
      img.store {
        height: 45px;
      }
      .store-wrapper {
        padding: 15px 0;
      }
      .store-link {
        margin-right: 10px;
      }
      .store-link:last-child {
        margin-right: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPushRegistration3Component extends StagesParentComponent implements OnInit {
  links: IStoreAsset[];

  ngOnInit() {
    super.ngOnInit();
    const links = getStoreLinks(this.response.callbacks);
    this.links = getLinksAssets(links);
  }
}

function getLinksAssets(links: string[] = []): IStoreAsset[] {
  return links.map(href => {
    if (href.includes('play.google.com')) {
      return {
        imgSrc: 'assets/images/google-play-badge.png',
        classes: 'android',
        text: 'Google Play',
        href
      };
    } else if (href.includes('itunes.apple.com')) {
      return {
        imgSrc: 'assets/images/app-store-badge.png',
        classes: 'ios',
        text: 'App Store',
        href
      };
    } else {
      return {
        imgSrc: '',
        classes: '',
        text: href,
        href
      };
    }
  });
}

function getStoreLinks(callbacks = []): string[] {
  return callbacks
    .filter(callback => callback.type === 'TextOutputCallback')
    .map(link => {
      const messageType = link.output.find(output => output.name === 'messageType');
      if (!messageType || messageType.value !== '0') return ''; // not link
      const message = link.output.find(output => output.name === 'message');
      if (!message) return ''; // no message
      return message.value;
    })
    .filter(link => link !== '');
}
