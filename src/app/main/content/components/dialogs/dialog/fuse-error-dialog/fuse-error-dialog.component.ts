import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'fuse-error-dialog',
  templateUrl: './fuse-error-dialog.component.html',
  styleUrls: ['./fuse-error-dialog.component.scss']
})
export class FuseErrorDialogComponent implements OnInit {
  error: any;
  dialogTitle: string;
  errorCode: number;
  errorDescription: string;

  constructor(
    public dialogRef: MatDialogRef<FuseErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: HttpErrorResponse
  ) {
    console.log(this.data);
    this.dialogTitle = this.data.name;
    this.errorCode = this.data.status;
    this.errorDescription = this.data.message;
  }

  ngOnInit() {}
}
