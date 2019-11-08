import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'forgerock-customization-palette-sample',
  templateUrl: './palette-sample.component.html',
  styleUrls: ['./palette-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteSampleComponent implements OnInit {
  @Input() cssvars = false;
  @Input() colors: string[];

  constructor() {}

  ngOnInit() {}

  getColor(color) {
    return this.cssvars ? `rgba(var(${color}), 1)` : `rgba(${color})`;
  }
}
