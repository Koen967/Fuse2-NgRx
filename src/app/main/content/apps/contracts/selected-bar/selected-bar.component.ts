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
    this.contractsService.onSelectedContractsChanged
      .subscribe(selectedContracts => {
        this.selectedContracts = selectedContracts;
        setTimeout(() => {
          this.hasSelectedContracts = selectedContracts.length > 0;
          this.isIndeterminate = (selectedContracts.length !== this.contractsService.contracts.length && selectedContracts.length > 0);
        }, 0);
      });
  }

  ngOnInit() {
  }

  selectAll()
    {
        this.contractsService.selectContracts();
    }

    deselectAll()
    {
        this.contractsService.deselectContracts();
    }

    deleteSelectedContracts()
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contracts?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.contractsService.deleteSelectedContracts();
            }
            this.confirmDialogRef = null;
        });
    }

}
