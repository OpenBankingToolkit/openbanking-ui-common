import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ForgerockMessagesModule } from '@forgerock/openbanking-ngx-common/services/forgerock-messages';
import { ForgerockAuthApiModule } from '../../forgerock-auth-api/forgerock-auth-api.module';
import { ForgerockConfigModule, ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';
import { ForgerockCustomerLogoModule } from '@forgerock/openbanking-ngx-common/components/forgerock-customer-logo';
import { ForgerockAlertModule } from '@forgerock/openbanking-ngx-common/components/forgerock-alert';

import { ForgerockAuthOauth2AuthorizeComponent } from './forgerock-auth-oauth2-authorize.component';
import { HttpClientModule } from '@angular/common/http';

describe('app:forgerock ForgerockAuthOauth2AuthorizeComponent', () => {
  let component: ForgerockAuthOauth2AuthorizeComponent;
  let fixture: ComponentFixture<ForgerockAuthOauth2AuthorizeComponent>;
  let forgerockConfigService;
  const originMock = 'https://this-is-a-test-origin.com';
  const authorizationServer = 'https://as.aspsp.ui-integ.forgerock.financial';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgerockAuthOauth2AuthorizeComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        CommonModule,
        TranslateModule.forRoot({}),
        NoopAnimationsModule,
        MatCardModule,
        MatProgressBarModule,
        HttpClientModule,
        ForgerockMessagesModule,
        ForgerockAuthApiModule,
        ForgerockConfigModule,
        ForgerockCustomerLogoModule,
        ForgerockAlertModule
      ],
      providers: [ForgerockConfigService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerockAuthOauth2AuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    forgerockConfigService = TestBed.get(ForgerockConfigService);
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      origin: originMock
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should updates redirection if redirecting to authorizationServer', () => {
    const toTest = new URL(
      `https://bank.ui-integ.forgerock.financial/login?goto=${encodeURIComponent(
        authorizationServer
      )}%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%2520id_token%26client_id%3Db61ab83a-a6f1-44c3-90c3-b514c93a9421%26state%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26redirect_uri%3Dhttps%253A%252F%252Fwww.google.com%26nonce%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26scope%3Dopenid%2520accounts%26request%3DeyJraWQiOi`
    );

    spyOn(forgerockConfigService, 'get').and.returnValue(authorizationServer);
    const newURL = component.updateRedirectionGotoIfAuthorizationServer(toTest);
    expect(newURL.toString()).toEqual(
      `https://bank.ui-integ.forgerock.financial/login?goto=${encodeURIComponent(
        originMock
      )}%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%2520id_token%26client_id%3Db61ab83a-a6f1-44c3-90c3-b514c93a9421%26state%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26redirect_uri%3Dhttps%253A%252F%252Fwww.google.com%26nonce%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26scope%3Dopenid%2520accounts%26request%3DeyJraWQiOi`
    );
  });

  it('should not updates redirection if redirecting is not authorizationServer', () => {
    const toTest = new URL(
      `https://bank.ui-integ.forgerock.financial/login?goto=${encodeURIComponent(
        'https://not-authorization-server.com'
      )}%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%2520id_token%26client_id%3Db61ab83a-a6f1-44c3-90c3-b514c93a9421%26state%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26redirect_uri%3Dhttps%253A%252F%252Fwww.google.com%26nonce%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26scope%3Dopenid%2520accounts%26request%3DeyJraWQiOi`
    );

    spyOn(forgerockConfigService, 'get').and.returnValue(authorizationServer);
    const newURL = component.updateRedirectionGotoIfAuthorizationServer(toTest);
    expect(newURL.toString()).toEqual(toTest.toString());
  });

  it('should not updates redirection no goto', () => {
    const toTest = new URL(
      `https://bank.ui-integ.forgerock.financial/login?nogooto=${encodeURIComponent(
        'https://not-authorization-server.com'
      )}%2Foauth2%2Fauthorize%3Fresponse_type%3Dcode%2520id_token%26client_id%3Db61ab83a-a6f1-44c3-90c3-b514c93a9421%26state%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26redirect_uri%3Dhttps%253A%252F%252Fwww.google.com%26nonce%3D10d260bf-a7d9-444a-92d9-7b7a5f088208%26scope%3Dopenid%2520accounts%26request%3DeyJraWQiOi`
    );

    spyOn(forgerockConfigService, 'get').and.returnValue(authorizationServer);
    const newURL = component.updateRedirectionGotoIfAuthorizationServer(toTest);
    expect(newURL.toString()).toEqual(toTest.toString());
  });
});
