import { Component, OnInit } from '@angular/core';
import { ContractsService } from '../contracts.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'selected-bar',
  templateUrl: './selected-bar.component.html',
  styleUrls: ['./selected-bar.component.scss']
})
export class SelectedBarComponent implements OnInit {
  selectedContracts: string[];
  hasSelectedContracts: boolean;
  isIndeterminate: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {
    
  }

  ngOnInit() {
  }

}
