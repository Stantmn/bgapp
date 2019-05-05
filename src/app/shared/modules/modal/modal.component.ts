import {Component, Input, Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './modal.component.html'
})
export class ModalContent {
  @Input() title;
  @Input() text;
  @Input() dialog;
  comment: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}

@Injectable()
@Component({
  selector: 'app-modal',
  template: ''
})
export class ModalComponent {
  private modalRef: any;
  public dialog: number;

  constructor(private modalService: NgbModal) {
    this.dialog = 0;
  }

  openMessage(title: string, text: string, dialog: number) {
    this.modalRef = this.modalService.open(ModalContent);
    this.modalRef.componentInstance.title = title;
    this.modalRef.componentInstance.text = text;
    this.modalRef.componentInstance.dialog = dialog;
    return this.modalRef.result;
  }

}
