import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ApiReponses } from '../../../models';

@Component({
  selector: 'app-not-found',
  template: `
    <h2>Sorry</h2>
    <p>
      The next authentication step is unfortunately not implemented. Please contact your administrator with more
      details, using the reference "{{ response.stage }}".
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  @Input() response: ApiReponses.AuthLoginResponse;
  @Output() formSubmit = new EventEmitter<any>();

  ngOnInit() {}
}
