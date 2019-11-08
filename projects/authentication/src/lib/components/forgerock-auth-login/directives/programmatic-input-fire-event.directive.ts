import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[programmaticInputFireEvent]'
})
export class ProgrammaticInputFireEventDirective implements OnInit {
  nativeElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.renderer.setElementAttribute(this.nativeElement, 'disabled', 'true');
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
