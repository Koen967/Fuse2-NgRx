import { Action } from '@ngrx/store';

export const OPEN_DIALOG = '[DIALOG] OPEN DIALOG';
export const CLOSE_DIALOG = '[DIALOG] CLOSE DIALOG';

export class OpenDialog implements Action {
  readonly type = OPEN_DIALOG;

  constructor(public dialogType: string, public data: any) {}
}

export class CloseDialog implements Action {
  readonly type = CLOSE_DIALOG;
}

export type DialogActionsAll = OpenDialog | CloseDialog;
