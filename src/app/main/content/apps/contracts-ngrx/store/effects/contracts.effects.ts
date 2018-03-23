import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as ContractActions from '../actions';
import * as DialogActions from '../../../../components/dialogs/store/actions';
import * as fromServices from '../../contracts.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContractsEffects {
  constructor(
    private actions$: Actions,
    private contractsService: fromServices.ContractsService
  ) {}

  @Effect()
  loadContracts$: Observable<
    ContractActions.ContractsActionsAll
  > = this.actions$
    .ofType<ContractActions.GetContracts>(ContractActions.GET_CONTRACTS)
    .pipe(
      switchMap(() => {
        return this.contractsService
          .getContracts()
          .pipe(
            map(
              contracts => new ContractActions.GetContractsSuccess(contracts)
            ),
            catchError(error =>
              of(new ContractActions.GetContractsFailed(error))
            )
          );
      })
    );

  @Effect()
  editContract$: Observable<
    ContractActions.ContractsActionsAll | DialogActions.DialogActionsAll
  > = this.actions$
    .ofType<ContractActions.EditContract>(ContractActions.EDIT_CONTRACT)
    .pipe(
      switchMap(action => {
        return this.contractsService
          .editContract(action.payload)
          .pipe(
            map(() => new ContractActions.EditContractSuccess(action.payload)),
            catchError(error =>
              of(new DialogActions.OpenDialog('error', error))
            )
          );
      })
    );

  @Effect()
  validateName$: Observable<
    ContractActions.ContractsActionsAll | DialogActions.DialogActionsAll
  > = this.actions$
    .ofType<ContractActions.ValidateName>(ContractActions.VALIDATE_NAME)
    .pipe(
      switchMap(action => {
        return this.contractsService
          .validateName(action.payload)
          .pipe(
            map(() => new ContractActions.EditContract(action.payload)),
            catchError(error =>
              of(new DialogActions.OpenDialog('error', error))
            )
          );
      })
    );

  /* @Effect()
  deleteContract$: Observable<
    ContractActions.ContractsActionsAll | DialogActions.DialogActionsAll
  > = this.actions$
    .ofType<ContractActions.EditContract>(ContractActions.DELETE_CONTRACT)
    .pipe(
      switchMap(action => {
        return this.contractsService
          .deleteContract(action.payload)
          .pipe(
            map(() => new ContractActions.DeleteContractSuccess(action.payload)),
            catchError(error =>
              of(new DialogActions.OpenDialog('error', error))
            )
          );
      })
    ); */
}
