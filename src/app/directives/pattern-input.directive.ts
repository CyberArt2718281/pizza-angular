import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[inputOrder]',
})
export class PatternInputDirective implements OnInit {
  @Input() inputOrderDefaultBorderColor: string = 'rgb(185, 145, 80)';
  @Input() inputOrderFocusBorderColor: string = 'rgba(57, 36, 2, 1)';
  @Output() directiveTextEvent = new EventEmitter<string>();

  constructor(private el: ElementRef, private rend: Renderer2) {}
  private _bgColor: string = '';
  private _isOnFocus: boolean = false;
  @HostBinding('style.borderColor')
  get getBgColor() {
    return this._bgColor;
  }
  @HostBinding('class.isOnFocus')
  get getIsOnFocus() {
    return this._isOnFocus;
  }
  @HostListener('focus', ['$event.target']) onFocus(target: HTMLElement) {
    this.directiveTextEvent.emit(
      `Focus on element input from directive! ${target.id}`
    );
    this.changeElementBorderColor(this.inputOrderFocusBorderColor);
    this._isOnFocus = true;
  }
  @HostListener('blur') onBlur() {
    this.changeElementBorderColor(this.inputOrderDefaultBorderColor);
    this._isOnFocus = false;
  }
  @HostListener('click', ['$event', '$event.target']) onClick(
    event: Event,
    target: HTMLElement
  ) {
    console.log(event);
    console.log(target);
  }

  ngOnInit() {
    this.changeElementBorderColor(this.inputOrderDefaultBorderColor);
    this.rend.setAttribute(
      this.el.nativeElement,
      'placeholder',
      this.el.nativeElement.getAttribute('placeholder') + '*'
    );

    // const text = this.rend.createElement('span');
    // this.rend.setProperty(text, 'innerText', '*Обязательно для заполнения')
    // this.rend.setStyle(text, 'color', 'red');
    // this.rend.insertBefore(this.el.nativeElement.parentElement, text, this.el.nativeElement)
  }

  changeElementBorderColor(color: string) {
    this._bgColor = color;
  }
}
