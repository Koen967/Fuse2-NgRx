import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromDialog from './dialogs.reducer';

export interface DialogAppState {
  dialogs: fromDialog.DialogState;
}

export const dialogReducers: ActionReducerMap<DialogAppState> = {
  dialogs: fromDialog.DialogReducer
};

export const getDialogAppState = createFeatureSelector<DialogAppState>(
  'dialogs-app'
);
