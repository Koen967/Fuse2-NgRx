import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as fromStore from './store';
import * as fromDialog from './dialog';
import { MatDialog } from '@angular/material';

@Injectable()
export class DialogService {
  dialogType$: Observable<string>;
  dialogData$: Observable<any>;

  dialogType: string;
  dialogData: any;
  dialogRef: any;

  constructor(
    private store: Store<fromStore.DialogAppState>,
    private dialog: MatDialog
  ) {
    console.log('DialogService initialized');
    this.dialogType$ = this.store.select(fromStore.getDialogType);
    this.dialogData$ = this.store.select(fromStore.getDialogData);

    this.dialogData$.subscribe(data => {
      this.dialogData = data;
    });

    this.dialogType$.subscribe(type => {
      if (type === '') {
        return;
      } else if (type === 'error') {
        this.dialogRef = this.dialog.open(fromDialog.FuseErrorDialogComponent, {
          data: this.dialogData
        });
      } else if (type === 'confirm') {
        this.dialogRef = this.dialog.open(
          fromDialog.FuseConfirmDialogComponent,
          {
            data: this.dialogData
          }
        );
      }

      this.dialogRef.afterClosed().subscribe(() => {
        this.store.dispatch(new fromStore.CloseDialog());
      });
    });
  }
}
