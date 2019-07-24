import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { LogService } from '../../services/log.service';
import { ModalComponent } from '../../shared/modules/modal/modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  providers: [LogService],
  animations: [routerTransition()]
})
export class LogComponent implements OnInit {
  public logs: string[];
  constructor(
    private logService: LogService,
    private modal: ModalComponent
  ) {
  }

  ngOnInit() {
    this.getLogs();
  }

  getLogs(): void {
    this.logService.getLogs()
      .subscribe(
        response => {
          this.logs = response;
        },
        error => {
          this.modal.openMessage('Server Error', 'Can\'t get a log information', 0);
          console.log(error);
        }
      );
  }

}
