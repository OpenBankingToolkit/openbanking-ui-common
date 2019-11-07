import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { FileDropModule } from 'ngx-file-drop';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { ForgerockCustomizationSidenavComponent } from 'forgerock/src/app/modules/customization/components/sidenav/sidenav.component';
import { ForgerockCustomizationService } from 'forgerock/src/app/modules/customization/services/customization.service';
import { ForgerockCssVarsService } from 'forgerock/src/app/modules/customization/services/cssvars.service';
import { ForgerockMessagesModule } from 'forgerock/src/app/services/forgerock-messages/forgerock-messages.module';
import { PaletteComponent } from './components/palette/palette.component';
import { PaletteSampleComponent } from './components/palette-sample/palette-sample.component';
import { PaletteBackgroundComponent } from './components/palette-background/palette-background.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ForgerockCustomizationToken } from './tokens';
import customizationFilesReducer from './store/reducers/files';
import { ForgerockCommonComponentsModule } from '../../components/forgerock-common-components.module';
import { ForgerockCustomerFaviconModule } from '../../components/forgerock-customer-favicon/forgerock-customer-favicon.module';

export interface ForgerockCustomization {
  cssVars: string;
}

export type ForgerockCustomizationFactory = () => ForgerockCustomization;

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>('Registered custom Reducers');

export function getCustomReducers() {
  return {
    customFiles: customizationFilesReducer
  };
}

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    FileDropModule,
    ForgerockCommonComponentsModule,
    ForgerockCustomerFaviconModule,
    ForgerockMessagesModule,
    StoreModule.forFeature('customization', REDUCER_TOKEN)
  ],
  declarations: [
    ForgerockCustomizationSidenavComponent,
    PaletteComponent,
    PaletteSampleComponent,
    PaletteBackgroundComponent,
    FileUploadComponent
  ],
  exports: [ForgerockCustomizationSidenavComponent],
  providers: [
    {
      provide: REDUCER_TOKEN,
      deps: [],
      useFactory: getCustomReducers
    }
  ]
})
export class ForgerockCustomizationModule {
  static forRoot(config: ForgerockCustomizationFactory): ModuleWithProviders {
    return {
      ngModule: ForgerockCustomizationModule,
      providers: [
        ForgerockCustomizationService,
        ForgerockCssVarsService,
        { provide: ForgerockCustomizationToken, useFactory: config }
      ]
    };
  }
}
