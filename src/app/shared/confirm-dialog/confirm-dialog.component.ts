import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() mainTitle: string;
  @Input() mainBody: string;
  @Input() confirmTitle: string;
  @Input() cancelTitle: string = 'Cancel';

  constructor(public dialog: NbDialogRef<ConfirmDialogComponent>) {}
}
