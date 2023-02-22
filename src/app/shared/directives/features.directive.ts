import { Directive, ElementRef , HostListener } from '@angular/core';

@Directive({
  selector: '[appFeatures]'
})
export class FeaturesDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.backgroundColor='';
    this.element.nativeElement.style.color='rgb(51, 71, 86)';
    }
  @HostListener('mouseleave') onMouseLeave(){
      this.element.nativeElement.style.backgroundColor='';
      this.element.nativeElement.style.color='';
      }

  constructor(
    private element: ElementRef
  )
  {
    // this.element.nativeElement.style.backgroundColor   = 'red';
  }
}
