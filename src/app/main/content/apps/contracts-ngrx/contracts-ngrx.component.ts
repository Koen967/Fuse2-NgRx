import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '../../../../core/animations';
import { ContractFormDialogComponent } from './contract-form-dialog/contract-form-dialog.component';

import { Contract } from './contracts.model';
import * as fromStore from './store';
import * as dialogStore from '../../components/dialogs/store';
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  AbstractControl
} from '@angular/forms';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { getContractsAppState } from './store';

@Component({
  selector: 'app-contracts-ngrx',
  templateUrl: './contracts-ngrx.component.html',
  styleUrls: ['./contracts-ngrx.component.scss'],
  animations: fuseAnimations
})
export class ContractsNgrxComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  dialogType$: Observable<string>;
  dialogData$: Observable<any>;
  formActionComplete$: Observable<boolean>;

  data: any;
  contracts: Contract[];
  searchInput: FormControl;
  dataSource: MatTableDataSource<Contract>;

  dialogFormRef: MatDialogRef<any>;
  dialogRef: any;

  constructor(
    private store: Store<fromStore.ContractsAppState>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.searchInput = new FormControl();
  }

  ngOnInit() {
    this.contracts$ = this.store.select(fromStore.getAllContracts);
    this.formActionComplete$ = this.store.select(
      fromStore.getFormActionComplete
    );

    this.contracts$.subscribe(contracts => {
      this.dataSource = new MatTableDataSource<Contract>(contracts);
      this.contracts = contracts;
    });

    this.formActionComplete$.subscribe(status => {
      if (status) {
        this.dialogFormRef.close();
      }
    });
  }

  editContract(contract) {
    this.dialogFormRef = this.dialog.open(ContractFormDialogComponent, {
      panelClass: 'contract-form-dialog',
      data: {
        contract: contract,
        action: 'edit'
      },
      disableClose: true
    });

    this.dialogFormRef.componentInstance.save.subscribe((form: FormGroup) => {
      if (form[0].valid) {
        const newContract: Contract = form[0].getRawValue();
        newContract.validFrom = form[0].get('date').get('validFrom').value;
        newContract.dateExpired = form[0].get('date').get('dateExpired').value;
        console.log(newContract);
        this.store.dispatch(
          new dialogStore.OpenDialog('confirm', {
            action: 'edit',
            name: contract.name,
            confirmAction: new fromStore.ValidateName(newContract)
          })
        );
      } else {
        this.touchEveryControl(form[0]);
      }
    });

    this.dialogFormRef.componentInstance.delete.subscribe(
      (deleteContract: Contract) => {
        this.store.dispatch(
          new dialogStore.OpenDialog('confirm', {
            action: 'delete',
            name: deleteContract.name,
            confirmAction: new fromStore.DeleteContractSuccess(deleteContract)
          })
        );
      }
    );

    this.dialogFormRef.backdropClick().subscribe(() => {
      this.dialogFormRef.close();
    });

    this.dialogFormRef.keydownEvents().subscribe(keyEvent => {
      if (keyEvent.key === 'Escape') {
        this.dialogFormRef.close();
      }
    });
  }

  touchEveryControl(form) {
    if (form.controls) {
      Object.keys(form.controls).forEach((controlName: string) => {
        form.get(controlName).markAsTouched();
        this.touchEveryControl(form.get(controlName));
      });
    }
  }

  deleteContract(contract) {
    this.store.dispatch(
      new dialogStore.OpenDialog('confirm', {
        action: 'delete',
        name: contract.name,
        confirmAction: new fromStore.DeleteContractSuccess(contract)
      })
    );
  }
}
