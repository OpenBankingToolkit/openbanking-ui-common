import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import debug from 'debug';

// all different stages
import { DataStore1Component } from './data-store1.component';
import { AuthenticatorPush3Component } from './authenticator-push3.component';
import { AuthenticatorPush4Component } from './authenticator-push4.component';
import { AuthenticatorPushRegistration2Component } from './authenticator-push-registration2.component';
import { AuthenticatorPushRegistration3Component } from './authenticator-push-registration3.component';
import { AuthenticatorPushRegistration4Component } from './authenticator-push-registration4.component';
import { AuthenticatorPushRegistration5Component } from './authenticator-push-registration5.component';
import { IConfigClient, ApiReponses } from '../../../models';
import { UnknownStageComponent } from './unknown-stage.component';
import { AuthenticatorRedirectComponent } from './authenticator-redirect.component';
import { ExchanceCodeComponent } from './exchance-code.component';

const log = debug('ForgerockAuthLogin:StagesComponent');

@Component({
  selector: 'app-stages',
  template: `
    <ng-template #dynamicTarget></ng-template>
  `,
  styleUrls: ['./stages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StagesComponent implements OnInit, OnChanges {
  constructor(protected route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {}

  @Input() response: ApiReponses.AuthLoginResponse;
  @Input() client: IConfigClient;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
  dynamicTarget: ViewContainerRef;

  ngOnInit() {}

  ngOnChanges(changes: any) {
    const authId = localStorage.getItem('AUTH_ID');
    if (authId) {
      //If we got an auth ID, it means we were in a middle of an OIDC authentication journey, waiting for the code.
      this.route.queryParams.subscribe((params: Params) => {
        log('params', params);
      });
      this.loadComponent(ExchanceCodeComponent);
    } else {
      if (!changes.response || !changes.response.currentValue) return;

      this.create(changes.response.currentValue);
    }
  }

  create(response) {
    let componentInstance;
    log('Stage : ', response.stage);
    switch (response.stage) {
      case 'DataStore1':
        componentInstance = DataStore1Component;
        break;
      case 'AuthenticatorPush3':
        componentInstance = AuthenticatorPush3Component;
        break;
      case 'AuthenticatorPush4':
        componentInstance = AuthenticatorPush4Component;
        break;
      // case 'AuthenticatorPush5':
      //   componentInstance = AuthenticatorPush5Component;
      //   break;
      case 'AuthenticatorPushRegistration2':
        componentInstance = AuthenticatorPushRegistration2Component;
        break;
      case 'AuthenticatorPushRegistration3':
        componentInstance = AuthenticatorPushRegistration3Component;
        break;
      case 'AuthenticatorPushRegistration4':
        componentInstance = AuthenticatorPushRegistration4Component;
        break;
      case 'AuthenticatorPushRegistration5':
        componentInstance = AuthenticatorPushRegistration5Component;
        break;
      case 'SocialAuthOpenID2':
        componentInstance = AuthenticatorRedirectComponent;
        break;
      default:
        componentInstance = UnknownStageComponent;
        break;
    }
    this.loadComponent(componentInstance);
  }

  private loadComponent(componentInstance) {
    // Select, clear and inject the dynamic component with props data
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentInstance);
    this.dynamicTarget.clear();
    const componentRef = this.dynamicTarget.createComponent(componentFactory);
    (<any>componentRef.instance).response = this.response;
    (<any>componentRef.instance).client = this.client;
    (<any>componentRef.instance).formSubmit = this.formSubmit;
  }
}
