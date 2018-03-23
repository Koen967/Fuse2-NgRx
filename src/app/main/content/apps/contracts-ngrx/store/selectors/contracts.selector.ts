import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromContracts from '../reducers/contracts.reducer';

export const getContractsState = createSelector(
  fromFeature.getContractsAppState,
  (state: fromFeature.ContractsAppState) => state.contracts
);

export const getContractsEntities = createSelector(
  getContractsState,
  fromContracts.getContractsEntities
);

export const getAllContracts = createSelector(
  getContractsEntities,
  entities => {
    return Object.keys(entities).map(
      contractNumber => entities[contractNumber]
    );
  }
);

export const getContractsLoaded = createSelector(
  getContractsState,
  fromContracts.getContractsLoaded
);

export const getContractsLoading = createSelector(
  getContractsState,
  fromContracts.getContractsLoading
);

export const getFormActionComplete = createSelector(
  getContractsState,
  fromContracts.getFormActionComplete
);
