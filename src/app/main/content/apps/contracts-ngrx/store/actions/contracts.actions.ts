import { Action } from '@ngrx/store';
import { Contract } from '../../../contracts/contracts.model';

export const GET_CONTRACTS = '[CONTRACTS] GET CONTRACTS';
export const GET_CONTRACTS_SUCCESS = '[CONTRACTS] GET CONTRACTS SUCCESS';
export const GET_CONTRACTS_FAILED = '[CONTRACTS] GET CONTRACTS FAILED';
export const ADD_CONTRACT = '[CONTRACTS] ADD CONTRACT';
export const ADD_CONTRACT_SUCCESS = '[CONTRACTS] ADD CONTRACT SUCCESS';
export const EDIT_CONTRACT = '[CONTRACTS] EDIT CONTRACT';
export const EDIT_CONTRACT_SUCCESS = '[CONTRACTS] EDIT CONTRACT SUCCESS';
export const DELETE_CONTRACT = '[CONTRACTS] DELETE CONTRACT SUCCESS';
export const DELETE_CONTRACT_SUCCESS = '[CONTRACTS] DELETE CONTRACT SUCCESS';
export const VALIDATE_NAME = '[CONTRACTS] VALIDATE NAME';

export class GetContracts implements Action {
  readonly type = GET_CONTRACTS;
}

export class GetContractsSuccess implements Action {
  readonly type = GET_CONTRACTS_SUCCESS;

  constructor(public payload: Contract[]) {}
}

export class GetContractsFailed implements Action {
  readonly type = GET_CONTRACTS_FAILED;

  constructor(public payload: any) {}
}

export class AddContract implements Action {
  readonly type = ADD_CONTRACT;

  constructor(public payload: any) {}
}

export class AddContractSuccess implements Action {
  readonly type = ADD_CONTRACT_SUCCESS;

  constructor(public payload: any) {}
}

export class EditContract implements Action {
  readonly type = EDIT_CONTRACT;

  constructor(public payload: Contract) {}
}

export class EditContractSuccess implements Action {
  readonly type = EDIT_CONTRACT_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteContract implements Action {
  readonly type = DELETE_CONTRACT;

  constructor(public payload: Contract) {}
}

export class DeleteContractSuccess implements Action {
  readonly type = DELETE_CONTRACT_SUCCESS;

  constructor(public payload: any) {}
}

export class ValidateName implements Action {
  readonly type = VALIDATE_NAME;

  constructor(public payload: Contract) {}
}

export type ContractsActionsAll =
  | GetContracts
  | GetContractsSuccess
  | GetContractsFailed
  | AddContract
  | AddContractSuccess
  | EditContract
  | EditContractSuccess
  | DeleteContract
  | DeleteContractSuccess
  | ValidateName;
