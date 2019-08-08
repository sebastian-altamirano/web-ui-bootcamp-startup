import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appScrollEnd]',
})
export class ScrollEndDirective {
  @Output() scrollEnd = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const tracker = event.target;
    const limit = tracker.scrollHeight - tracker.clientHeight - 1;

    if (tracker.scrollTop >= limit) {
      this.scrollEnd.emit();
    }
  }
}
