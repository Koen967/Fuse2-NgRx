import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromContracts from './contracts.reducer';

export interface ContractsAppState {
  contracts: fromContracts.ContractsState;
}

export const reducers: ActionReducerMap<ContractsAppState> = {
  contracts: fromContracts.ContractsReducer
};

export const getContractsAppState = createFeatureSelector<ContractsAppState>(
  'contracts-app'
);
