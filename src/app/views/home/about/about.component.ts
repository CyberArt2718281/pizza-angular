import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements  AfterViewInit{
  constructor(private modalService:NgbModal) {
  }
  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;
  ngAfterViewInit() {
    this.popupComponent.open()

  }

}
