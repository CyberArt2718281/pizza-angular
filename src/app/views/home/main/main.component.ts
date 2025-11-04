import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {CartService} from '../../../shared/services/cart.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from '../../../../environments/environment'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  // private observable: Observable<number>;
  private subject: Subject<number>;

  private subscription: Subscription | null = null;

  constructor(public cartService: CartService, private modalService: NgbModal) {
    // this.observable = from([ 1, 2, 3, 4, 5]);

    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeOut1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

    // this.observable = new Observable((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     observer.next(count++);
    //   }, 1000);
    //   const timeOut1 = setTimeout(() => {
    //     observer.complete();
    //   }, 4000);
    //   const timeOut2 =  setTimeout(() => {
    //     observer.error('world');
    //   }, 5000);
    //   return {
    //     unsubscribe: () => {
    //       clearInterval(interval);
    //       clearTimeout(timeOut1);
    //       clearTimeout(timeOut2);
    //     }
    //   }
    // })
  }


  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  ngOnInit() {
    // const myModalAlternative = new bootstrap.Modal('#myModal', {})
    //
    // myModalAlternative.show();
    console.log(environment);
    this.subscription = this.subject.subscribe({
      next: (param: number) => {
        console.log('subscriber 1:' + param);
      },
      error: (error: string) => {
        console.log('Error occurred:' + error);
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit() {
    // this.popupComponent.open()
    // const modalRef = this.modalService.open(PopupComponent, {});
    // modalRef.componentInstance.data = 'Вы точно хотите перейти на страницу пицц';
    // this.modalService.open(this.popup, {})

  }


}
