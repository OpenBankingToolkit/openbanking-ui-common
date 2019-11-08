import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import debug from 'debug';

import { Field, ICallback } from '../../../models';
import { NameCallbackComponent } from '../dynamic-inputs/name-callback.component';
import { PasswordCallbackComponent } from '../dynamic-inputs/password-callback.component';
import { HiddenValueCallbackComponent } from '../dynamic-inputs/hiddenvalue-callback.component';
import { TextOutputCallbackComponent } from '../dynamic-inputs/textoutput-callback.component';
import { ConfirmationCallbackComponent } from '../dynamic-inputs/confirmation-callback.component';
import { ChoiceCallbackComponent } from '../dynamic-inputs/choice-callback.component';
import { RedirectCallbackComponent } from '../dynamic-inputs/redirect-callback.component';
import { FormButtonComponent } from '../dynamic-inputs/form-button.component';

const log = debug('dynamicField');

const components: { [type: string]: Type<Field> } = {
  NameCallback: NameCallbackComponent,
  PasswordCallback: PasswordCallbackComponent,
  HiddenValueCallback: HiddenValueCallbackComponent,
  TextOutputCallback: TextOutputCallbackComponent,
  ConfirmationCallback: ConfirmationCallbackComponent,
  ChoiceCallback: ChoiceCallbackComponent,
  RedirectCallback: RedirectCallbackComponent,
  button: FormButtonComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: ICallback;
  @Input()
  authId: string;
  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.authId = this.authId;
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      log(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    } else {
      const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
      this.component = this.container.createComponent(component);
      this.component.instance.authId = this.authId;
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }
}
