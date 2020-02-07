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
  @Input() isFavorite = false;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngAfterContentChecked(): void {
    if (this.isFavorite) {
      this.renderer.addClass(this.el.nativeElement, 'highlight-favorite');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'highlight-favorite');
    }
  }
}
