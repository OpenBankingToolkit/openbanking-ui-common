import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ForgerockConfigService } from '@forgerock/openbanking-ngx-common/services/forgerock-config';

@Component({
  selector: 'forgerock-dev-info',
  templateUrl: './forgerock-dev-info.component.html',
  styleUrls: ['./forgerock-dev-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockDevInfoComponent implements OnInit {
  config: any = this.configService.config;

  constructor(private configService: ForgerockConfigService) {}

  ngOnInit() {
    console.log(this.configService.config);
  }
}
