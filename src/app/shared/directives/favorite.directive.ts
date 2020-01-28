import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[dbFavorite]'
})
export class FavoriteDirective implements AfterContentChecked {
  @Input() isFavorite: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.isFavorite = false;
  }

  ngAfterContentChecked(): void {
    if (this.isFavorite) {
      this.renderer.addClass(this.el.nativeElement, 'highlight-favorite');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'highlight-favorite');
    }
  }
}
