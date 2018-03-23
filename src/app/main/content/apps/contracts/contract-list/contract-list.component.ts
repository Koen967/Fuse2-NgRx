import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../../core/animations';
import { ContractsService } from '../contracts.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import {
  MatDialogRef,
  MatDialog,
  MatPaginator,
  MatTableDataSource
} from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { ContractFormDialogComponent } from '../contract-form-dialog/contract-form-dialog.component';
import { Contract } from '../contracts.model';

@Component({
  selector: 'contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ContractListComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContent') dialogContent: TemplateRef<any>;
  @ViewChild('paginator') paginator: MatPaginator;

  contracts: any;
  user: any;
  dataSource: MatTableDataSource<Contract> | null;
  displayedColumns = [
    'checkbox',
    'name',
    'customer',
    'remark',
    'validFrom',
    'dateExpired',
    'status',
    'buttons'
  ];
  selectedContracts: any[];
  checkboxes: {};

  onContractsChangedSubscription: Subscription;
  onSelectedContractsChangedSubscription: Subscription;
  onUserDataChangedSubscription: Subscription;

  dialogRef: any;

  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

  constructor(
    private contractsService: ContractsService,
    public dialog: MatDialog
  ) {
    this.onContractsChangedSubscription = this.contractsService.onContractsChanged.subscribe(
      contracts => {
        this.contracts = contracts;

        this.checkboxes = {};
        contracts.map(contract => {
          this.checkboxes[contract.contractNumber] = false;
        });
      }
    );

    this.onSelectedContractsChangedSubscription = this.contractsService.onSelectedContractsChanged.subscribe(
      selectedContracts => {
        for (const contractNumber in this.checkboxes) {
          if (!this.checkboxes.hasOwnProperty(contractNumber)) {
            continue;
          }
          this.checkboxes[contractNumber] = selectedContracts.includes(
            +contractNumber
          );
        }
        this.selectedContracts = selectedContracts;
      }
    );

    this.onUserDataChangedSubscription = this.contractsService.onUserDataChanged.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnInit() {
    this.contractsService.getContracts().then(contracts => {
      this.dataSource = new MatTableDataSource(contracts);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.onContractsChangedSubscription.unsubscribe();
    this.onSelectedContractsChangedSubscription.unsubscribe();
    this.onUserDataChangedSubscription.unsubscribe();
  }

  editContract(contract) {
    this.dialogRef = this.dialog.open(ContractFormDialogComponent, {
      panelClass: 'contract-form-dialog',
      data: {
        contract: contract,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      if (!response) {
        return;
      }
      const actionType: string = response[0];
      const formData: FormGroup = response[1];
      switch (actionType) {
        case 'save':
          this.contractsService.updateContract(formData.getRawValue());
          break;
        case 'delete':
          this.deleteContract(contract);
          break;
      }
    });
  }

  deleteContract(contract) {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage =
      'Are you sure you want to delete ' + contract.name + '?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractsService.deleteContract(contract);
      }
      this.confirmDialogRef = null;
    });
  }

  onSelectedChange(contractId) {
    this.contractsService.toggleSelectedContract(contractId);
  }
}
