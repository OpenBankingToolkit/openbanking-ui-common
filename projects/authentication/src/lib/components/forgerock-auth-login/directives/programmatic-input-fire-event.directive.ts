import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[programmaticInputFireEvent]'
})
export class ProgrammaticInputFireEventDirective implements OnInit {
  nativeElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.renderer.setAttribute(this.nativeElement, 'disabled', 'true');
    Object.defineProperty(this.nativeElement, 'value', {
      get: function() {
        return this.getAttribute('value');
      },
      set: function(v) {
        this.setAttribute('value', v);
        this.dispatchEvent(new CustomEvent('input'));
      },
      configurable: true
    });
  }
}
