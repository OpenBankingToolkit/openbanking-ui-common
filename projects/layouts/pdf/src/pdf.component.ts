import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pdf-layout',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PDFLayoutComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this.document.body.classList.add('pdf');
  }
}
