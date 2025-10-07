import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[isChicken]',
})
export class IsChickenDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input() isChicken: string = '';
  ngOnInit() {
    if (this.isChicken.toLowerCase().includes('курица')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
  // set isChicken(description: string) {
  //   if (description.toLowerCase().includes('курица')) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   }else
  //   {
  //     this.viewContainer.clear();
  //   }
  // }
}
