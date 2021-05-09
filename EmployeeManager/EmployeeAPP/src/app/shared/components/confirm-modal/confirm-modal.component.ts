import { Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'em-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() cancelButton: string = '';
  @Input() confirmButton: string = '';
  @Input() showCancelButton = true;
  @Input() showConfirmButton = true;
  @Input() isClosable = true;

  @Output() public onConfirmCallback: EventEmitter<any> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal ) {}

  public onClose(result: boolean) {
    this.activeModal.close(result);
  }
}
