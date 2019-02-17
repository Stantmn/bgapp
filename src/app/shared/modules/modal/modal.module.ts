import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent, ModalContent} from './modal.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  entryComponents: [ModalComponent, ModalContent],
  declarations: [ModalComponent, ModalContent],
  providers: [ModalComponent]
})
export class ModalModule {
}
