import * as DialogActions from '../actions/dialogs.actions';

export interface DialogState {
  type: string;
  data: {};
}

export const DialogInitialState: DialogState = {
  type: '',
  data: {}
};

export function DialogReducer(
  state = DialogInitialState,
  action: DialogActions.DialogActionsAll
): DialogState {
  switch (action.type) {
    case DialogActions.OPEN_DIALOG: {
      console.log('Opening dialog');
      return {
        ...state,
        type: action.dialogType,
        data: action.data
      };
    }

    case DialogActions.CLOSE_DIALOG: {
      return DialogInitialState;
    }

    default: {
      return state;
    }
  }
}

export const getDialogType = (state: DialogState) => state.type;
export const getDialogData = (state: DialogState) => state.data;
