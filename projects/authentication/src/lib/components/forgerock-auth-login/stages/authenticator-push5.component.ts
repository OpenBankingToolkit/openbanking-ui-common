import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-authenticator-push5',
  template: `
    <div>AuthenticatorPush5Component</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatorPush5Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
