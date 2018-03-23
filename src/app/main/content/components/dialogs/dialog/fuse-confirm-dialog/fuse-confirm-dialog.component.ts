import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'fuse-confirm-dialog',
  templateUrl: './fuse-confirm-dialog.component.html',
  styleUrls: ['./fuse-confirm-dialog.component.scss']
})
export class FuseConfirmDialogComponent implements OnInit {
  dialogAction: string;
  objectName: string;

  constructor(
    public dialogRef: MatDialogRef<FuseConfirmDialogComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dialogAction = this.data.action;
    this.objectName = this.data.name;
  }

  dispatchAction() {
    this.dialogRef.close();
    this.store.dispatch(this.data.confirmAction);
  }

  ngOnInit() {}
}
