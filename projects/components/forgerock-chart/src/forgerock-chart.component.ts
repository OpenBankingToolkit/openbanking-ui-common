import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Chart } from 'chart.js';
import _merge from 'lodash-es/merge';
import _get from 'lodash-es/get';
import _cloneDeep from 'lodash-es/cloneDeep';

@Component({
  selector: 'forgerock-chart',
  template: `
    <canvas #chart></canvas>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockChartComponent implements OnInit, OnChanges {
  @Input() config: Chart.ChartConfiguration;
  @ViewChild('chart', { read: ViewContainerRef, static: true })
  chart: ViewContainerRef;
  instance: Chart;

  defaultOptions: Chart.ChartOptions = {
    responsive: true
  };

  constructor() {}

  ngOnInit() {
    Chart.pluginService.register({
      beforeDraw: function(chart: any) {
        const centerConfig = _get(chart, 'options.elements.center');
        if (chart.config.type === 'doughnut' && centerConfig) {
          // Code from http://jsfiddle.net/nkzyx50o/
          const {
            text = '',
            fontStyle = 'Roboto',
            color = '#000',
            sidePadding = 20,
            xShift = 0,
            yShift = 0,
            fontSizeFactor = 1
          } = centerConfig;

          const ctx = chart.ctx;
          const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
          //Start with a base font of 30px
          ctx.font = '30px ' + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          const stringWidth = ctx.measureText(text).width;
          const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const elementHeight = chart.innerRadius * 2;

          // Pick a new font size so it will not be larger than the height of label.
          const fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = fontSizeToUse * fontSizeFactor + 'px ' + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(text, centerX + xShift, centerY + yShift);
        }
      }
    });

    const options = _merge({}, this.defaultOptions, _get(this.config, 'options', {}));
    this.instance = new Chart(
      this.chart.element.nativeElement,
      _cloneDeep({
        ...(this.config || {}),
        options
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange && changes.config.currentValue) {
      this.instance.config = _cloneDeep(changes.config.currentValue);
      this.instance.update();
    }
  }
}
