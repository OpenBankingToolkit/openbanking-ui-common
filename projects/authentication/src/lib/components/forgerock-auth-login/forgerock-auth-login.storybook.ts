import { storiesOf, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
// import { withBackgrounds } from '../../../.storybook/theme-addon';

import { ForgerockAuthLoginComponent } from './forgerock-auth-login.component';
import { ngModuleConfig } from './forgerock-auth-login.module';

delete ngModuleConfig.declarations;

// console.log('ButtonModule', ButtonModule);

storiesOf('ForgerockAuthLoginComponent', module)
  .addDecorator(checkA11y)
  // .addDecorator(
  //   withBackgrounds([
  //     { name: 'twitter', value: '#00aced', default: true },
  //     { name: 'facebook', value: '#3b5998' },
  //   ])
  // )
  .addDecorator(moduleMetadata(ngModuleConfig))
  .add('with text prop emoji', () => ({
    component: ForgerockAuthLoginComponent,
    props: {
      text: '😀 😎 👍 💯'
    }
  }));
