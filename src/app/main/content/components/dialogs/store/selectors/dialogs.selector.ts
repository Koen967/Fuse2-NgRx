import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDialogs from '../reducers/dialogs.reducer';

export const getDialogState = createSelector(
  fromFeature.getDialogAppState,
  (state: fromFeature.DialogAppState) => state.dialogs
);

export const getDialogType = createSelector(
  getDialogState,
  fromDialogs.getDialogType
);

export const getDialogData = createSelector(
  getDialogState,
  fromDialogs.getDialogData
);
