import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { ContractsService } from './contracts.service';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ContractsComponent implements OnInit, OnDestroy {
  searchInput: FormControl;
  hasSelectedContracts: boolean;
  dialogRef: any;
  onSelectedContractsChangedSubscription: Subscription;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog) {
    this.searchInput = new FormControl('');
  }

  newContract() {
    this.dialogRef = this.dialog.open(ContractFormDialogComponent, {
      panelClass: 'contract-form-dialog',
      data      : {
        action  : 'new'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if ( !response ) {
          return;
        }
        this.contractsService.updateContract(response.getRawValue());
      });
  }

  ngOnInit() {
    this.onSelectedContractsChangedSubscription =
      this.contractsService.onSelectedContractsChanged
        .subscribe(selectedContracts => {
          this.hasSelectedContracts = selectedContracts.length > 0;
        });
    
        this.searchInput.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(searchText => {
            this.contractsService.onSearchTextChanged.next(searchText);
        });
  }

  ngOnDestroy() {
    this.onSelectedContractsChangedSubscription.unsubscribe();
  }

}
